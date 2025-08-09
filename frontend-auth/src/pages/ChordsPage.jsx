import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChordsPage.css';
import acordeImage from '../assets/Acordes.png'; 

const ChordsPage = () => {
  const [chords, setChords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://98.80.152.185/api/chords')
      .then(response => response.json())
      .then(data => setChords(data))
      .catch(error => console.error('Error al obtener acordes:', error));
  }, []);

  const handleBack = () => {
    navigate('/functionalities');
  };

  return (
    <div className="chords-container">
      <h1 className="chords-title">🎵 Acordes Musicales</h1>
      <p className="chords-description">
        Explora diferentes acordes, sus notas y tipos.
      </p>

      <div className="chords-grid">
        {chords.map(chord => (
          <div key={chord.id} className="chord-card">
            <h2>{chord.name}</h2>
            <p><strong>Notas:</strong> {chord.notes}</p>
            <p><strong>Tipo:</strong> {chord.type}</p>
          </div>
        ))}
      </div>

      {/* Imagen entre acordes y botón */}
      <div className="chords-image-wrapper">
        <img src={acordeImage} alt="Referencia de acordes" className="chords-image" />
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button className="back-button" onClick={handleBack}>
          ← Volver a funcionalidades
        </button>
      </div>
    </div>
  );
};

export default ChordsPage;