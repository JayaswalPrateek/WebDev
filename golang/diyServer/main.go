package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"
)

type User struct {
	Name string `json:"name"`
}

type UserHelper struct {
	userCache  map[int]User
	cacheMutex sync.RWMutex
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hello Root")
	fmt.Fprintf(w, "Hello Root")
}

func (h *UserHelper) createUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Created User")
	fmt.Fprintf(w, "Created User")
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if len(user.Name) == 0 {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}
	h.cacheMutex.Lock()
	defer h.cacheMutex.Unlock()
	h.userCache[len(h.userCache)+1] = user
	w.WriteHeader(http.StatusNoContent)
}

func (h *UserHelper) getUserByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	h.cacheMutex.RLock()
	defer h.cacheMutex.RUnlock()
	user, ok := h.userCache[id]
	if !ok {
		http.Error(w, fmt.Sprintf("user not found"), http.StatusNotFound)
		return
	}
	j, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

func main() {
	h := &UserHelper{make(map[int]User), sync.RWMutex{}}
	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("POST /users", h.createUser)
	mux.HandleFunc("GET /user/{id}", h.getUserByID)
	fmt.Println("Server listening to :8080 on localhost")
	http.ListenAndServe(":8080", mux)
}
