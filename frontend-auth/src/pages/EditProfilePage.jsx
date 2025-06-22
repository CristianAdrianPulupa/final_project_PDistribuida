import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import './ProfilePage.css';

const EditProfilePage = () => {
  const [bio, setBio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
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

    fetch(`http://localhost:3006/api/profile/${userId}`)
      .then(res => res.json())
      .then(data => setBio(data.bio))
      .catch(err => console.error('Error al obtener perfil:', err));
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3006/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio })
      });

      if (res.ok) {
        setMensaje("✅ Biografía actualizada");
        setExito(true);
        setTimeout(() => navigate('/profile'), 800);
      } else {
        setMensaje("❌ Error al actualizar biografía");
        setExito(false);
      }
    } catch (error) {
      setMensaje("❌ Error de conexión");
      setExito(false);
    }
  };

  return (
    <div className="profile-container">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {mensaje && (
          <div className={`mb-4 p-2 rounded text-sm text-center font-semibold ${exito ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensaje}
          </div>
        )}

        <h2 className="profile-title">📄 Editar Biografía</h2>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="3"
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded resize-none"
        />

        <div className="profile-buttons">
          <button className="btn edit" onClick={handleSubmit}>Guardar</button>
          <button className="btn back" onClick={() => navigate('/profile')}>← Cancelar</button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfilePage;





