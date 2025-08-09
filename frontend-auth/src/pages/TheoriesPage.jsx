import React, { useEffect, useState } from 'react';
import './TheoriesPage.css';
import CirculoImg from '../assets/theories/circulo-quintas.png';

const TheoriesPage = () => {
  const [theories, setTheories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://98.80.152.185/api/theory")
      .then((res) => res.json())
      .then((data) => setTheories(data))
      .catch((err) => console.error("Error al obtener teorías:", err));
  }, []);

  const handleCardClick = (topic) => {
    if (topic.toLowerCase() === 'círculo de quintas') {
      setShowModal(true);
    }
  };

  return (
    <div className="theory-container">
      <h1 className="theory-title">🎓 Teorías Musicales</h1>
      <div className="theory-grid">
        {theories.map((theory) => (
          <div
            key={theory.id}
            className="theory-card"
            onClick={() => handleCardClick(theory.topic)}
            style={{ cursor: 'pointer' }}
          >
            <div className="theory-card-content">
              <h2 className="theory-topic">{theory.topic}</h2>
              <p className="theory-content">{theory.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="back-button-container">
        <a href="/functionalities" className="back-button">
          ← Volver a Funcionalidades
        </a>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={CirculoImg} alt="Círculo de Quintas" className="modal-image" />
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheoriesPage;
