import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    language: "es",
    status: "" // se sigue usando, pero no se muestra
  });
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const uid = decoded.id || decoded.userId;
        setUserId(uid);

        // Obtener tema
        fetch(`http://localhost:3007/api/settings/${uid}`)
          .then((res) => res.json())
          .then((data) => {
            setSettings((prev) => ({ ...prev, theme: data.theme }));
            document.body.classList.toggle("dark-theme", data.theme === "dark");
          });

        // Obtener estado (pero no se muestra)
        fetch(`http://localhost:3008/api/status/${uid}`)
          .then((res) => res.json())
          .then((statusData) => {
            setSettings((prev) => ({ ...prev, status: statusData.status }));
          })
          .catch((err) => console.error("Error al obtener estado:", err));
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
      body: JSON.stringify({ theme: settings.theme }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSettings((prev) => ({ ...prev, theme: data.theme }));
        document.body.classList.toggle("dark-theme", data.theme === "dark");
        navigate("/home"); // 🔁 Redirige después de guardar
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
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
        <h2 style={{
          marginBottom: "1rem",
          color: "var(--text-color, #000)"
        }}>
          ⚙️ Configuración del Usuario
        </h2>

        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label style={{ color: "var(--text-color, #000)" }}>Tema:</label><br />
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "var(--card-bg, #fff)",
              color: "var(--text-color, #000)"
            }}
          >
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
          NOTARY
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
