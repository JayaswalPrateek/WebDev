package user

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"

	"ecommerceAPI/types"
)

type mockUserStore struct {
}

func (s *mockUserStore) GetUserByID(id int) (*types.User, error) {
	return nil, nil
}

func (s *mockUserStore) GetUserByEmail(email string) (*types.User, error) {
	return nil, fmt.Errorf("user not found")
}

func (s *mockUserStore) CreateUser(types.User) error {
	return nil
}

func TestUserServiceHandlers(t *testing.T) {
	userStore := &mockUserStore{}
	handler := NewHandler(userStore)
	t.Run("Fails when given an valid payload", func(t *testing.T) {
		payload := types.ResgisterUserPayload{
			FirstName: "foo",
			LastName:  "bar",
			Email:     "invalid",
			Password:  "baz",
		}
		marshalled, err := json.Marshal(payload)
		if err != nil {
			t.Fatalf("Failed to marshal payload: %v", err)
		}
		req, err := http.NewRequest(
			http.MethodPost,
			"/register",
			bytes.NewBuffer(marshalled))
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()
		router := mux.NewRouter()
		router.HandleFunc("/register", handler.handleRegisteration)
		router.ServeHTTP(rr, req)
		if rr.Code != http.StatusBadRequest {
			t.Errorf(
				"Expected status code %d but got %d instead",
				http.StatusBadRequest,
				rr.Code,
			)
		}
	})
	t.Run("Fails when given an invalid payload", func(t *testing.T) {
		payload := types.ResgisterUserPayload{
			FirstName: "foo",
			LastName:  "bar",
			Email:     "valid@mail.com",
			Password:  "baz",
		}
		marshalled, err := json.Marshal(payload)
		if err != nil {
			t.Fatalf("Failed to marshal payload: %v", err)
		}
		req, err := http.NewRequest(
			http.MethodPost,
			"/register",
			bytes.NewBuffer(marshalled))
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()
		router := mux.NewRouter()
		router.HandleFunc("/register", handler.handleRegisteration)
		router.ServeHTTP(rr, req)
		if rr.Code != http.StatusCreated {
			t.Errorf(
				"Expected status code %d but got %d instead",
				http.StatusCreated,
				rr.Code,
			)
		}
	})
}
