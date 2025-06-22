const express = require('express');
const router = express.Router();
const {
  registerLogin,
  registerLogout,
  getSessionsByUser
} = require('../controllers/sessionController');

router.post('/login', registerLogin);
router.post('/logout', registerLogout);
router.get('/user/:userId', getSessionsByUser);

module.exports = router;
