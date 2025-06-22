import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/notary-logo1.png" alt="Notary" className="logo" />
        <span className="brand">Notary</span>
      </div>
      <div className="navbar-right">
        <a href="#funcionalidades">Funcionalidades</a>
        <a href="#comunidad">Comunidad</a>
        <a href="#precios">Precios</a>
        <a href="/">Cerrar sesión</a>
      </div>
    </nav>
  );
}
