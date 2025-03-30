package user

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
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

func (h *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) HandleRegisteration(w http.ResponseWriter, r *http.Request) {
	var payload types.ResgisterUserPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		if err = utils.WriteError(w, http.StatusBadRequest, err); err != nil {
			log.Fatal(err)
		}
		return
	}
	if err := utils.Validate.Struct(payload); err != nil {
		var validationErrs validator.ValidationErrors
		if errors.As(err, &validationErrs) {
			if err := utils.WriteError(w,
				http.StatusBadRequest,
				fmt.Errorf("invalid payload %v", validationErrs),
			); err != nil {
				log.Fatal(err)
			}
			return
		}
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	_, err := h.store.GetUserByEmail(payload.Email)
	if err == nil {
		if err = utils.WriteError(w,
			http.StatusBadRequest,
			fmt.Errorf(
				"user with email %s already exists",
				payload.Email,
			),
		); err != nil {
			log.Fatal(err)
		}
		return
	}
	hashedPassword, err := auth.HashPassword(payload.Password)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
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
	if err := utils.WriteJSON(w, http.StatusCreated, nil); err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
	}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/login", h.HandleLogin).Methods("POST")
	router.HandleFunc("/register", h.HandleRegisteration).Methods("POST")
}
