package user

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"

	"ecommerceAPI/services/auth"
	"ecommerceAPI/types"
	"ecommerceAPI/utils"
)

type Handler struct {
	store types.UserStore
}

func NewHandler(store types.UserStore) *Handler {
	return &Handler{store}
}

func (h *Handler) handleLogin(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) handleRegisteration(w http.ResponseWriter, r *http.Request) {
	var payload types.ResgisterUserPayload
	if err := utils.ParseJSON(r, payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}
	_, err := h.store.GetUserByEmail(payload.Email)
	if err == nil {
		utils.WriteError(w,
			http.StatusBadRequest,
			fmt.Errorf(
				"user with email %s already exists",
				payload.Email,
			),
		)
		return
	}
	hashedPassword, err := auth.HashPassword(payload.Password)
	err = h.store.CreateUser(types.User{
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Email:     payload.Email,
		Password:  hashedPassword,
	})
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	utils.WriteJSON(w, http.StatusCreated, nil)
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/login", h.handleLogin).Methods("POST")
	router.HandleFunc("/register", h.handleRegisteration).Methods("POST ")
}
