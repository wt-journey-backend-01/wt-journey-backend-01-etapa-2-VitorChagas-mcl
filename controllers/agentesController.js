const agentesController = require('../controllers/agentesController');

const express = require('express');
const router = express.Router();

router.get('/agentes', agentesController.findAll);
router.get('/agentes/:id', agentesController.findById);