import React, { useEffect, useState } from 'react';
import './InstrumentGuidePage.css';
import { Link } from 'react-router-dom';

function InstrumentGuidePage() {
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  useEffect(() => {
    fetch('http://98.80.152.185/api/instrument-guide/guides')
      .then((response) => response.json())
      .then((data) => setInstruments(data))
      .catch((error) => console.error('Error fetching instrument guides:', error));
  }, []);

  return (
    <div className="instrument-guides-container">
      <h1 className="instrument-guides-title">Guía de Instrumentos Musicales</h1>
      <p className="instrument-guides-description">
        Explora información clave sobre diferentes instrumentos.
      </p>

      <div className="instrument-guides-list">
        {instruments.map((instrument) => (
          <div
            key={instrument.id}
            className="instrument-guide-card"
            onClick={() => setSelectedInstrument(instrument)}
          >
            <div className="instrument-name">{instrument.instrument}</div>
          </div>
        ))}
      </div>

      {selectedInstrument && (
        <div className="instrument-description-box">
          <h2>{selectedInstrument.instrument}</h2>
          <p>{selectedInstrument.content}</p>
        </div>
      )}

      <Link to="/functionalities">
        <button className="back-button">← Volver a funcionalidades</button>
      </Link>
    </div>
  );
}

export default InstrumentGuidePage;
