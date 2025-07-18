const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/', agentesController.findAll);
router.get('/:id', agentesController.findById);
router.post('/', agentesController.create);
router.put('/:id', agentesController.update);
router.patch('/:id', agentesController.partialUpdate);
router.delete('/:id', agentesController.delete);

module.exports = router;