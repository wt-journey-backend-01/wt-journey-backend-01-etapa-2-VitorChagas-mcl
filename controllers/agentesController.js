const agentesRepository = require('../repositories/agentesRepository');

const express = require('express');
const router = express.Router();

router.get('/agentes', (req, res) => {
    const agentes = agentesRepository.findAll();
    res.json(agentes);
    if(agentes.length === 0) {
        res.status(404).send('Nenhum agente encontrado');
    }
});

router.get('/agentes/:id', (req, res) => {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if(agente) {
        res.json(agente);
    } else {
        res.status(404).send('Agente não encontrado');
    }
});

router.post('/agentes', (req, res) => {
    const novoAgente = req.body;
    const agenteCriado = agentesRepository.create(novoAgente);
    res.status(201).json(agenteCriado);
});

router.put('/agentes/:id', (req, res) => {
    const id = req.params.id;
    const agenteAtualizado = req.body;
    const agente = agentesRepository.update(id, agenteAtualizado);
    if(agente) {
        res.json(agente);
    } else {
        res.status(404).send('Agente não encontrado');
    }
});

router.delete('/agentes/:id', (req, res) => {
    const id = req.params.id;
    const resultado = agentesRepository.delete(id);
    if(resultado) {
        res.status(204).send();
    } else {
        res.status(404).send('Agente não encontrado');
    }
});

module.exports = router;