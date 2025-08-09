import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyLessonsPage.css';

const DailyLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://98.80.152.185/api/daily-lessons/lessons')
      .then(response => response.json())
      .then(data => setLessons(data))
      .catch(error => console.error('Error al obtener las lecciones:', error));
  }, []);

  const handleBackClick = () => {
    navigate('/functionalities');
  };

  return (
    <div className="daily-lessons-wrapper">
      <h1 className="main-title">Lecciones Diarias</h1>

      <div className="lessons-list">
        {lessons.map((lesson, index) => (
          <div className="lesson-card" key={index}>
            <h2>{lesson.title}</h2>
            <p>{lesson.content}</p>
            <p className="date">📅 {lesson.date}</p>
          </div>
        ))}
      </div>

      <div className="back-button-wrapper">
        <button className="back-button" onClick={handleBackClick}>
          ⬅ Regresar a funcionalidades
        </button>
      </div>
    </div>
  );
};

export default DailyLessonsPage;
