import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleRegister = async () => {
    const url = `${API_BASE}/api/users/register`;
    console.log('👉 Registrando en:', url);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json();
      if (res.ok) {
        setMensaje('Registro exitoso ✅');
      } else {
        setMensaje(data.message || 'Error al registrar ❌');
      }
    } catch (err) {
      setMensaje('Error al conectar con el servidor ❌');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{' '}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{' '}
      <button onClick={handleRegister}>Registrarse</button>
      <p>{mensaje}</p>
    </div>
  );
};

export default RegisterPage;
