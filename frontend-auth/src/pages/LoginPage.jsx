import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // ✅ Añade esto

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);

        // ✅ Decodificar el token y guardar el userId
        const decoded = jwt_decode(data.token);
        localStorage.setItem('userId', decoded.userId);

        setMensaje('Inicio de sesión exitoso ✅');
        navigate('/profile');
      } else {
        setMensaje(data.message || 'Credenciales inválidas ❌');
      }
    } catch (err) {
      setMensaje('Error al conectar con el servidor ❌');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
      <p>{mensaje}</p>
    </div>
  );
};

export default LoginPage;
