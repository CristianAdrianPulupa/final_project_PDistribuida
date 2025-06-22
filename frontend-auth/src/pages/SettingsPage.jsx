import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SettingsPage = () => {
  const [settings, setSettings] = useState({ theme: "light", language: "es" });
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const uid = decoded.id || decoded.userId;
        setUserId(uid);

        fetch(`http://localhost:3007/api/settings/${uid}`)
          .then((res) => res.json())
          .then((data) => {
            setSettings(data);
            document.body.classList.toggle("dark-theme", data.theme === "dark");
          });
      } catch (err) {
        console.error("Token inválido", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    fetch(`http://localhost:3007/api/settings/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        document.body.classList.toggle("dark-theme", data.theme === "dark");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
        <h2 style={{ marginBottom: "1rem" }}>⚙️ Configuración del Usuario</h2>

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label>Tema:</label><br />
          <select name="theme" value={settings.theme} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }}>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
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
            marginBottom: "1rem",
            cursor: "pointer"
          }}
        >
          Guardar Cambios
        </button>

        <button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "#343a40",
            color: "white",
            padding: "0.6rem",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
