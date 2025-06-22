import React, { useEffect, useState } from "react";
import { FaBell, FaCog } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import "./Navbar.css";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("token");
  let userId = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.userId;
    } catch (err) {
      console.error("Token inválido o expirado", err);
    }
  }

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3003/api/notifications/${userId}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error("Error cargando notificaciones:", err));
    }
  }, [userId]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/notary-logo1.png" alt="Notary" className="logo" />
        <span className="brand">Notary</span>
        <a href="/settings" className="settings-link">
          <FaCog /> Ajustes
        </a>
      </div>

      <div className="navbar-right">
        <a href="#funcionalidades">Funcionalidades</a>
        <a href="#comunidad">Comunidad</a>
        <a href="#precios">Precios</a>

        <div className="notification-icon" onClick={toggleDropdown}>
          <FaBell />
          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </div>

        <a href="/">Cerrar sesión</a>
        <a href="/profile" className="nav-link">Perfil</a>
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          <h4>Notificaciones</h4>
          <ul>
            {notifications.map((n) => (
              <li key={n._id}>
                <strong>{n.type.toUpperCase()}:</strong> {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
