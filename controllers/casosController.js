const casosController = require('../controllers/casosController');
const express = require('express');
const router = express.Router();

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" 
    }, 
]

function findAll() {
    return casos;
}

router.get('/casos', (req, res) =>{
    const casos = findAll();
    if(casos.length === 0) {
        res.status(404).send('Nenhum caso encontrado');
    } else {
        res.json(casos);
    }
});

router.get('/casos/:id', (req, res) => {
    const id = req.params.id;
    const caso = casos.find(caso => caso.id === id);
    if(caso) {
        res.json(caso);
    } else {
        res.status(404).send('Caso não encontrado');
    }
});

router.post('/casos', (req, res) => {
    const novoCaso = req.body;
    if (!novoCaso.titulo || !novoCaso.descricao) {
        res.status(400).send('Título e descrição são obrigatórios');
        return;
    }
    casos.push(novoCaso);
    res.status(201).json(novoCaso);
});

router.put('/casos/:id', (req, res) => {
    const id = req.params.id;
    const casoAtualizado = req.body;
    const caso = casos.find(caso => caso.id === id);
    if (!caso) {
        res.status(404).send('Caso não encontrado');
        return;
    }
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos[index] = { ...casos[index], ...casoAtualizado };
        res.json(casos[index]);
    } else {
        res.status(404).send('Caso não encontrado');
    }
});

router.delete('/casos/:id', (req, res) => {
    const id = req.params.id;
    const caso = casos.find(caso => caso.id === id);
    if (!caso) {
        res.status(404).send('Caso não encontrado');
        return;
    }
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Caso não encontrado');
    }
});

module.exports = {
    findAll() {
        return casos;
    }
}
