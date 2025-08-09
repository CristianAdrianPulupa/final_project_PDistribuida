import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaEnvelope, FaEdit } from 'react-icons/fa';
import './ProfilePage.css';
import { motion } from 'framer-motion';

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("cargando...");
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let userId = null;

  try {
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded.userId || decoded._id;
  } catch (error) {
    console.error("Token inválido o no encontrado");
    navigate('/');
  }

  useEffect(() => {
  if (!userId) return;

  const headers = { Authorization: `Bearer ${token}` };

  // Obtener perfil
  fetch(`${API_BASE}/api/profile/${userId}`, { headers })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener perfil');
      return res.json();
    })
    .then(data => setProfile(data))
    .catch(err => {
      console.error(err);
      setProfile(null);
    });

  // Obtener estado
  fetch(`${API_BASE}/api/status/${userId}`, { headers })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener estado');
      return res.json();
    })
    .then(data => setStatus(data.status || "conectado"))
    .catch(err => {
      console.error(err);
      setStatus("conectado");
    });
}, [userId, token]);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="profile-title">👤 Perfil de Usuario</h2>
        <p style={{ fontWeight: "bold", marginTop: "-0.5rem", color: "#555" }}>
          Estado: <span style={{ color: "#007bff" }}>{status}</span>
        </p>

        <div className="profile-info">
          <p><FaUser /> {profile.name}</p>
          <p><FaEnvelope /> {profile.email}</p>
          <p className="bio">{profile.bio}</p>
        </div>

      <div className="profile-buttons">
        <button className="btn edit" onClick={() => navigate('/edit-profile')}>
          <FaEdit /> Editar
        </button>
        <button className="btn" onClick={() => navigate('/notes')}>
        📝 Notas
        </button>
        <button className="btn back" onClick={() => navigate('/home')}>
          ← Volver
        </button>
      </div>

      </motion.div>
    </div>
  );
};

export default ProfilePage;
