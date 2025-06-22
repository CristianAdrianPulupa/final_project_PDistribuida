// frontend-auth/src/Home.js
import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-layout">
      <div className="home-text">
        <h1>Escribe música online en conjunto.</h1>
        <p>
          Notary es una plataforma de creación y notación musical colaborativa para músicos,
          compositores y estudiantes. Comparte tu inspiración, graba ideas y trabaja con tu equipo.
        </p>
        <button>Comenzar ahora</button>
      </div>
      <div className="home-illustration">
        <img src="/images/piano.jpg" alt="Música colaborativa" />
      </div>
    </div>
  );
}
