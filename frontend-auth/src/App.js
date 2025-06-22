// frontend-auth/src/App.js
import React, { useState } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from "./pages/SettingsPage";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";


// Componente de login/registro
function AuthApp() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:3001/api/users/login"
      : "http://localhost:3001/api/users/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin ? { email, password } : { name, email, password }
        ),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(isLogin ? "Inicio de sesión exitoso ✅" : "Registro exitoso ✅");
        localStorage.setItem("token", data.token);
        if (isLogin) {
          setTimeout(() => navigate("/home"), 1000);
        }
      } else {
        setMessage(data.message || "Error en la solicitud ❌");
      }
    } catch (error) {
      setMessage("No se pudo conectar con el servidor ❌");
    }
  };

  return (
    <div className="container">
      <div className="left-panel"></div>

      <div className="right-panel">
        <div className="form-box">
          <img
            src="/images/notary-logo.png"
            alt="Notary Logo"
            className="logo-notary"
            style={{ width: "100px", marginBottom: "1rem" }}
          />
          <h2>{isLogin ? "Iniciar sesión" : "Registro"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                required
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button type="submit">{isLogin ? "Entrar" : "Registrarse"}</button>
          </form>

          <button
            className="toggle-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>

          {message && (
            <p
              style={{
                marginTop: "1rem",
                color: "crimson",
                fontWeight: "bold",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded.userId;

        fetch(`http://localhost:3007/api/settings/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            // Aplicar o quitar clase dark-theme
            document.body.classList.toggle("dark-theme", data.theme === "dark");
          });
      } catch (err) {
        console.error("Token inválido al cargar tema:", err);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthApp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}
