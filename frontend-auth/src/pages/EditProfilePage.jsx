import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditProfilePage = () => {
  const [profile, setProfile] = useState({ name: "", email: "", bio: "" });
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const uid = decoded.id || decoded.userId;
        setUserId(uid);

        fetch(`http://localhost:3006/api/profile/${uid}`)
          .then(res => res.json())
          .then(data => setProfile(data))
          .catch(err => console.error("Error al obtener perfil:", err));
      } catch (err) {
        console.error("Token inválido", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    fetch(`http://localhost:3006/api/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/profile"); // ✅ Redirigir después de guardar
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
      backgroundColor: "var(--background, #f5f5f5)", color: "var(--text-color, #000)"
    }}>
      <div style={{
        backgroundColor: "var(--card-bg, #fff)",
        color: "var(--text-color, #000)",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>📝 Editar Perfil</h2>

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.3rem",
              backgroundColor: "var(--input-bg, #fff)",
              color: "var(--text-color, #000)",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label>Correo:</label>
          <input
            type="email"
            value={profile.email}
            disabled
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.3rem",
              backgroundColor: "var(--input-disabled, #eee)",
              color: "var(--text-color, #000)",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label>Biografía:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.3rem",
              backgroundColor: "var(--input-bg, #fff)",
              color: "var(--text-color, #000)",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "0.6rem",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
