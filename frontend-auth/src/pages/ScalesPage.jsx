import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ScalesPage.css';

// Importar imágenes locales
import mayorImage from '../assets/escalamayor.png';
import menorImage from '../assets/escalamenor.png';
import armonicaImage from '../assets/armonica.png';
import pentatonicaMayorImage from '../assets/pentatonica-mayor.png';
import pentatonicaMenorImage from '../assets/pentatonica-menor.png';

const ScalesPage = () => {
  const [scales, setScales] = useState([]);

  useEffect(() => {
    const prefersDark = localStorage.getItem('theme') === 'dark';
    if (prefersDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    fetch('http://98.80.152.185/api/scales/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setScales(data);
        } else {
          console.error('Respuesta inesperada:', data);
        }
      })
      .catch((error) => console.error('Error al obtener escalas:', error));
  }, []);

  const getImageForScale = (name) => {
    const key = name.toLowerCase();
    if (key.includes('mayor') && !key.includes('pentatónica')) return mayorImage;
    if (key.includes('menor') && !key.includes('armónica') && !key.includes('pentatónica')) return menorImage;
    if (key.includes('armónica')) return armonicaImage;
    if (key.includes('pentatónica') && key.includes('mayor')) return pentatonicaMayorImage;
    if (key.includes('pentatónica') && key.includes('menor')) return pentatonicaMenorImage;
    return null;
  };

  return (
    <div className="scales-container">
      <h1 className="scales-title">🎼 Escalas Musicales</h1>
      <div className="scales-description">
        Las notas musicales pueden ordenarse de distintas formas. Es posible formar Escalas Musicales organizando
        las notas con combinaciones diferentes de intervalos. Cada una de estas escalas tendrá un sonido distinto.
        Conocer y dominar las escalas musicales debe ser una meta para todo músico.
      </div>

      {scales.length === 0 ? (
        <p>No hay escalas disponibles.</p>
      ) : (
        <ul className="scales-list">
          {scales.map((scale) => (
            <li key={scale.id} className="scale-card">
              <h2 className="scale-name">{scale.name}</h2>
              <p><strong>Tipo:</strong> {scale.type}</p>
              <p><strong>Notas:</strong> {scale.notes}</p>
              {getImageForScale(scale.name) && (
                <img
                  src={getImageForScale(scale.name)}
                  alt={`Imagen de ${scale.name}`}
                  className="scale-image"
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="back-button-container">
        <Link to="/functionalities" className="back-button">
          ← Volver a funcionalidades
        </Link>
      </div>
    </div>
  );
};

export default ScalesPage;
