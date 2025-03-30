package main

import (
	"fmt"
	"log"
	"os"

	mysqlCfg "github.com/go-sql-driver/mysql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"ecommerceAPI/config"
	"ecommerceAPI/db"
)

func main() {
	db, err := db.NewMySQLStorage(mysqlCfg.Config{
		User:                 config.Envs.DBUser,
		Passwd:               config.Envs.DBPassword,
		Addr:                 config.Envs.DBAddress,
		DBName:               config.Envs.DBName,
		Net:                  "tcp",
		AllowNativePasswords: true,
		ParseTime:            true,
	})
	if err != nil {
		log.Fatal(err)
	}
	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		log.Fatal(err)
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://cmd/migrate/migrations",
		"mysql",
		driver,
	)
	if err != nil {
		log.Fatal(err)
	}

	if len(os.Args) < 2 {
		fmt.Println("Missing argument.")
		fmt.Println("Valid arguments: up, down")
		os.Exit(1)
	}

	switch cmd := os.Args[1]; cmd {
	case "up":
		err = m.Up()
	case "down":
		err = m.Down()
	default:
		fmt.Println("Invalid argument:", cmd)
		fmt.Println("Valid arguments: up, down")
		os.Exit(1)
	}

	if err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}
}
