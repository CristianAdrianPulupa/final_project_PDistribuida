// src/pages/MusicQuizPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MusicQuizPage.css';

const MusicQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
  fetch('http://98.80.152.185/api/music-quiz/quizzes')
    .then((res) => res.json())
    .then((data) => {
      console.log('Quizzes recibidos:', data); // <-- Agregado
      if (Array.isArray(data)) {
        const filtered = data.filter(
          (quiz) => quiz.options && Array.isArray(quiz.options) && quiz.options.length > 0
        );
        setQuizzes(filtered);
      } else {
        console.error('Respuesta inesperada:', data);
      }
    })
    .catch((error) => console.error('Error al obtener quizzes:', error));
}, []);


  const toggleAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🧠 Quizzes Musicales</h1>

      {quizzes.length === 0 ? (
        <p>No hay quizzes disponibles.</p>
      ) : (
        <ul className="quiz-list">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="quiz-card">
              <h2 className="question">Pregunta: {quiz.question}</h2>
              <p><strong>Opciones:</strong> {quiz.options.join(', ')}</p>

              {showAnswers[quiz.id] ? (
                <p className="answer"><strong>Respuesta:</strong> {quiz.answer}</p>
              ) : null}

              <button onClick={() => toggleAnswer(quiz.id)} className="show-answer-button">
                {showAnswers[quiz.id] ? 'Ocultar respuesta' : 'Mostrar respuesta'}
              </button>
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

export default MusicQuizPage;
