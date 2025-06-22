import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Importación corregida
import { FaUser, FaEnvelope, FaEdit } from 'react-icons/fa';
import './ProfilePage.css';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let userId = null;

  try {
    const decoded = jwtDecode(token); // ✅ Uso corregido
    userId = decoded.id || decoded.userId || decoded._id;
  } catch (error) {
    console.error("Token inválido o no encontrado");
    navigate('/'); // Redirige si falla
  }

  console.log("🔐 Token:", token);
  console.log("🧠 userId decodificado:", userId);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3006/api/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("🟡 Perfil obtenido:", data);
        setProfile(data);
      })
      .catch(err => console.error('Error al obtener perfil:', err));
  }, [userId]);

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

        <div className="profile-info">
          <p><FaUser /> {profile.name}</p>
          <p><FaEnvelope /> {profile.email}</p>
          <p className="bio">{profile.bio}</p>
        </div>

        <div className="profile-buttons">
          <button className="btn edit" onClick={() => navigate('/edit-profile')}>
            <FaEdit /> Editar
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
