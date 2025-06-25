package db

import (
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB(filepath string) {
    var err error
    DB, err = sql.Open("sqlite3", filepath)
    if err != nil {
        panic(err)
    }

    createTable := `CREATE TABLE IF NOT EXISTS faqs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL
    );`

    _, err = DB.Exec(createTable)
    if err != nil {
        panic(err)
    }
}