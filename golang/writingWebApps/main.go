package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

type Page struct {
	title string
	body  []byte
}

func (p *Page) save() error {
	return os.WriteFile(p.title+".txt", p.body, 0600)
}

func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	body, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{title, body}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/view/"):]
	p, err := loadPage(title)
	if err != nil {
		fmt.Println("Error:", err)
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	body := string(p.body)
	fmt.Printf("Read: '%s'\n", body)
	fmt.Fprintf(w, `
		<h1>%s</h1>
		<div><i>%s</i></div>
	`, p.title, p.body)
}

func main() {
	http.HandleFunc("/view/", viewHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
