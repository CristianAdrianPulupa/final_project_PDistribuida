import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.userId || decoded.id;

  useEffect(() => {
    fetch(`http://localhost:3009/api/notes/${userId}`)
      .then(res => res.json())
      .then(setNotes)
      .catch(console.error);
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) return;

    if (editingId) {
      const res = await fetch(`http://localhost:3009/api/notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId })
      });
      const updated = await res.json();
      setNotes(notes.map(note => note._id === editingId ? updated : note));
      setEditingId(null);
    } else {
      const res = await fetch("http://localhost:3009/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId })
      });
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
    }

    setForm({ title: "", content: "" });
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3009/api/notes/${id}`, { method: "DELETE" });
    setNotes(notes.filter(n => n._id !== id));
  };

  return (
    <div style={{ padding: "2rem", color: "var(--text-color, #fff)" }}>
      <h2>📝 Mis Notas</h2>

      <h4>✍️ Nueva Nota</h4>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "5px" }}
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={form.content}
        onChange={handleChange}
        style={{ width: "100%", height: "80px", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "5px" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "0.6rem",
          width: "100%",
          border: "none",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}
      >
        {editingId ? "Actualizar Nota" : "Guardar Nota"}
      </button>

      {notes.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        notes.map(note => (
          <div key={note._id} style={{
            backgroundColor: "var(--card-bg, #1f1f1f)",
            color: "var(--text-color, #fff)",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem"
          }}>
            <h4><strong>{note.title}</strong></h4>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleEdit(note)}
                style={{
                  backgroundColor: "#ffc107",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.3rem 0.6rem",
                  color: "#000"
                }}
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                style={{
                  backgroundColor: "#dc3545",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.3rem 0.6rem",
                  color: "#fff"
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      <button
        onClick={() => navigate("/home")}
        style={{
          backgroundColor: "#343a40",
          color: "white",
          padding: "0.6rem",
          width: "100%",
          border: "none",
          borderRadius: "4px",
          marginTop: "1rem"
        }}
      >
        ← Volver
      </button>
    </div>
  );
};

export default NotesPage;
