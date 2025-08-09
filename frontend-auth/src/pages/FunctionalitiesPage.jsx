import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FunctionalitiesPage.css'; // ✅ Importa el CSS

const FunctionalitiesPage = () => {
  const navigate = useNavigate();

  const microservices = [
    { name: 'Teorías Musicales', path: '/theories', image: '/images/theory.jpg' },
    { name: 'Escalas Musicales', path: '/scales', image: '/images/scales.jpg' },
    { name: 'Guía de Instrumentos', path: '/instrument-guides', image: '/images/instruments.jpg' },
    { name: 'Acordes Musicales', path: '/chords', image: '/images/chords.jpg' },
    { name: 'Lecciones Diarias', path: '/daily-lessons', image: '/images/daily.jpg' },
    { name: 'Quizzes Musicales', path: '/music-quizzes', image: '/images/quiz.jpg' },
  ];

  return (
    <div className="functionalities-container">
      <h1 className="functionalities-title">🛠 Funcionalidades</h1>
      <p className="functionalities-description">
        Bienvenido a la sección de funcionalidades del contenido musical. <br />
        Aquí podrás explorar lecciones, teorías, escalas, acordes, quizzes y más.
      </p>

      <div className="functionalities-grid">
        {microservices.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            className="functionalities-card"
          >
            <img src={service.image} alt={service.name} />
            <div className="functionalities-card-body">
              <h2 className="functionalities-card-title">{service.name}</h2>
              <p className="functionalities-card-sub">Ver detalles</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => navigate('/home')}
          className="back-button"
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default FunctionalitiesPage;
