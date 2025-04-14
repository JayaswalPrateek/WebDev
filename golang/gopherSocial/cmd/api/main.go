package main

import (
	"log"

	"gopherSocial/internal/env"
)

func main() {
	cfg := config{addr: env.GetString("ADDR", ":8000")} // 8080
	app := &application{cfg}
	mux := app.mount()
	log.Fatal(app.run(mux))
}
