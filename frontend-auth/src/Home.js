import React from "react";
import Navbar from "./components/Navbar"; // Importa el componente de la barra de navegación
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar /> {/* 👈 barra superior */}
      <div className="home-container">
        <div className="home-text">
          <h1>Plataforma para el aprendizaje musical</h1>

          <p>
            Notary es una plataforma de notación musical para
            principiantes y profesionales. ¡Comienza tu viaje musical hoy!
          </p>
        </div>
        <img
          src="/images/flat-hero.png"
          alt="Ilustración musical"
          className="home-illustration"
        />
      </div>
    </>
  );
}
