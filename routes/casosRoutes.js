const express = require('express')
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/', casosController.findAll);
router.get('/:id', casosController.findById);
router.post('/', casosController.create);
router.put('/:id', casosController.update);
router.delete('/:id', casosController.delete);

module.exports = router