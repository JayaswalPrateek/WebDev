package db

import (
	"context"
	"database/sql"
	"time"
)

// not using dbConfig struct as the internal dir should be isolated from the outer world
func New(addr string, maxOpenConns, maxIdleConns int, maxIdleTime string) (*sql.DB, error) {
	db, err := sql.Open("postgres", addr)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(maxOpenConns)
	db.SetMaxIdleConns(maxIdleConns)
	if duration, err := time.ParseDuration(maxIdleTime); err != nil {
		return nil, err
	} else {
		db.SetConnMaxIdleTime(duration)
	}
	// ping to check if the connection is alive
	ctx, cancel := context.WithTimeout(
		context.Background(), 5*time.Second,
	)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}
	return db, nil
}
