package main

import (
	"log"

	"gopherSocial/internal/env"
	"gopherSocial/internal/store"
)

func main() {
	cfg := config{addr: env.GetString("ADDR", ":8000")} // 8080
	store := store.NewStorage(nil)
	app := &application{cfg, store}
	mux := app.mount()
	log.Fatal(app.run(mux))
}
