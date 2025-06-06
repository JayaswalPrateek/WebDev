package config

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	PublicHost                 string
	Port                       string
	DBUser                     string
	DBPassword                 string
	DBAddress                  string
	DBName                     string
	JWTExpirationTimeoutInSecs int64
	JWTSecret                  string
}

var Envs = initConfig()

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getEnvAsInt(key string, fallback int64) int64 {
	if value, ok := os.LookupEnv(key); ok {
		i, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return fallback
		}
		return i
	}
	return fallback
}

func initConfig() Config {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	DBHost := getEnv("DB_HOST", "127.0.0.1")
	DBPort := getEnv("DB_PORT", "3306")
	return Config{
		PublicHost:                 getEnv("PUBLIC_HOST", "http://localhost"),
		Port:                       getEnv("PORT", "8080"),
		DBUser:                     getEnv("DB_USER", "root"),
		DBPassword:                 getEnv("DB_PASSWORD", ""),
		DBAddress:                  fmt.Sprintf("%s:%s", DBHost, DBPort),
		DBName:                     getEnv("DB_NAME", "ecom"),
		JWTExpirationTimeoutInSecs: getEnvAsInt("JWT_EXP", 3600*24*7),
		JWTSecret:                  getEnv("JWT_SECRET", "ThisWasSupposedToBeASecret"),
	}
}
