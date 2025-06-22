const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  role: { type: String, required: true }, // Ej: 'admin'
  action: { type: String, required: true } // Ej: 'create_project'
});

module.exports = mongoose.model('Permission', PermissionSchema);
