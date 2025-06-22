const Notification = require('../models/Notification');

// Crear nueva notificación
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const newNotification = new Notification({ userId, message, type });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
};

// Obtener notificaciones por usuario
exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};
