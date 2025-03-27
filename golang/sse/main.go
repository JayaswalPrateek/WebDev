package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"
)

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello World")
}

func events(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	tokens := []string{
		"lorem", "ipsum", "dolor", "sit", "amet",
		"consectetur", "adipiscing", "elit", "sed", "do",
		"eiusmod", "tempor", "incididunt", "ut", "labore",
		"et", "dolore", "magna", "aliqua", "ut", "enim",
		"ad", "minim", "veniam", "quis", "nostrud",
		"exercitation", "ullamco", "laboris", "nisi", "ut",
		"aliquip", "ex", "ea", "commodo", "consequat",
	}
	for _, token := range tokens {
		content := fmt.Sprintf("data: %s\n\n", string(token))
		if _, err := w.Write([]byte(content)); err != nil {
			log.Printf("Error writing response: %v", err)
			return
		}

		if flusher, ok := w.(http.Flusher); ok {
			flusher.Flush()
		} else {
			log.Println("Flusher interface not available")
			return
		}
		time.Sleep(time.Duration(50+rand.Intn(101)) * time.Millisecond)
	}

}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/events", events)
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
