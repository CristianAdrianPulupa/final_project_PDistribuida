import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Fondo con imagen musical */}
      <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/11/29/02/06/piano-1869726_1280.jpg')` }}>
        {/* Solo fondo visual */}
      </div>

      {/* Contenido del mensaje */}
      <div className="md:w-1/2 flex flex-col justify-center items-start p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Escribe música de forma colaborativa 🎵
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Bienvenido a tu plataforma distribuida para creación musical. Comienza a colaborar con otros músicos desde cualquier parte del mundo.
        </p>
        <a
          href="/auth"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Empezar
        </a>
      </div>
    </div>
  );
}
