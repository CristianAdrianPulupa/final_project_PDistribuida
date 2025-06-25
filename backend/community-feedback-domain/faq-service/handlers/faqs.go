package handlers

import (
    "encoding/json"
    "faq-service/db"
    "net/http"
    "strconv"
)

type FAQ struct {
    ID       int    `json:"id"`
    Question string `json:"question"`
    Answer   string `json:"answer"`
}

func HandleFAQs(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        rows, _ := db.DB.Query("SELECT id, question, answer FROM faqs")
        var faqs []FAQ
        for rows.Next() {
            var f FAQ
            rows.Scan(&f.ID, &f.Question, &f.Answer)
            faqs = append(faqs, f)
        }
        json.NewEncoder(w).Encode(faqs)

    case http.MethodPost:
        var f FAQ
        json.NewDecoder(r.Body).Decode(&f)
        stmt, _ := db.DB.Prepare("INSERT INTO faqs (question, answer) VALUES (?, ?)")
        result, _ := stmt.Exec(f.Question, f.Answer)
        id, _ := result.LastInsertId()
        f.ID = int(id)
        json.NewEncoder(w).Encode(f)

    case http.MethodDelete:
        idStr := r.URL.Query().Get("id")
        id, _ := strconv.Atoi(idStr)
        stmt, _ := db.DB.Prepare("DELETE FROM faqs WHERE id = ?")
        stmt.Exec(id)
        json.NewEncoder(w).Encode(map[string]string{"message": "Deleted"})
    
    case http.MethodPut:
        idStr := r.URL.Query().Get("id")
        id, _ := strconv.Atoi(idStr)
        var f FAQ
        json.NewDecoder(r.Body).Decode(&f)
        stmt, _ := db.DB.Prepare("UPDATE faqs SET question = ?, answer = ? WHERE id = ?")
        stmt.Exec(f.Question, f.Answer, id)
        f.ID = id
        json.NewEncoder(w).Encode(f)

    }
}