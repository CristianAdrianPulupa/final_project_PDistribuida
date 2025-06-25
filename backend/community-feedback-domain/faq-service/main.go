package main

import (
    "log"
    "net/http"
    "faq-service/handlers"
    "faq-service/db"
)

func main() {
    db.InitDB("faq.db")
    http.HandleFunc("/faqs", handlers.HandleFAQs)
    log.Println("FAQ Service running on port 3011")
    log.Fatal(http.ListenAndServe(":3011", nil))
}