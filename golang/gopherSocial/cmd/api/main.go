package main

import (
	"log"

	"gopherSocial/internal/db"
	"gopherSocial/internal/env"
	"gopherSocial/internal/store"
)

func main() {
	cfg := config{addr: env.GetString("ADDR", ":8000")} // 8080
	dbConfig := dbConfig{
		addr: env.GetString("DB_ADDR",
			"postgres://admin:adminpassword@localhost/social?sslmode=disable"),
		maxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
		maxIdleConns: env.GetInt("DB_MAX_IDLE_CONNS", 30),
		maxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
	}
	db, err := db.New(
		dbConfig.addr,
		dbConfig.maxOpenConns,
		dbConfig.maxIdleConns,
		dbConfig.maxIdleTime,
	)
	if err != nil {
		log.Panic(err)
	}
	defer db.Close()
	log.Println("DB Connection pool successful")
	store := store.NewStorage(db)
	app := &application{cfg, store, dbConfig}
	mux := app.mount()
	log.Fatal(app.run(mux))
}
