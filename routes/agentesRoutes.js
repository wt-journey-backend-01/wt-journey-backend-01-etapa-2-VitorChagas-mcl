const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/agentes', agentesController.seuMetodo)

module.exports = router