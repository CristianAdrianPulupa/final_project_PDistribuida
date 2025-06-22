const Session = require('../models/Session');

const registerLogin = async (req, res) => {
  try {
    const { userId, token } = req.body;
    const session = new Session({ userId, token });
    await session.save();
    res.status(201).json({ message: 'Inicio de sesión registrado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar login', error: err.message });
  }
};

const registerLogout = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { logoutAt: new Date() },
      { new: true }
    );
    res.status(200).json({ message: 'Cierre de sesión registrado', session });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar logout', error: err.message });
  }
};

const getSessionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ userId });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener sesiones', error: err.message });
  }
};

module.exports = { registerLogin, registerLogout, getSessionsByUser };
