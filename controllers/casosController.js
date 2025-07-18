// controllers/casosController.js
const casosRepository = require('../repositories/casosRepository');

const uuid = require('uuid');

module.exports = {
    findAll(req, res) {
        const casos = casosRepository.findAll();
        if (!casos || casos.length === 0) {
            return res.status(404).send('Nenhum caso encontrado');
        }
        res.json(casos);
    },

    findById(req, res) {
        const id = uuid.v4();
        const caso = casosRepository.findById(id);
        if (!caso) {
            return res.status(404).send('Caso não encontrado');
        }
        res.json(caso);
    },

    create(req, res) {
        const novoCaso = req.body;
        novoCaso = uuid.v4();
        if (!novoCaso.titulo || !novoCaso.descricao || !novoCaso.status || !novoCaso.agente_id) {
            return res.status(400).json({ message: 'Campos obrigatórios faltando' });
        }
        const casoCriado = casosRepository.create(novoCaso);
        res.status(201).json(casoCriado);
    },

    update(req, res) {
        const id = req.params.id;
        const dadosAtualizados = req.body;
        const caso = casosRepository.update(id, dadosAtualizados);
        if (!caso) {
            return res.status(404).send('Caso não encontrado');
        }
        res.json(caso);
    },

    partialUpdate(req, res) {
        const id = req.params.id;
        const dadosParciais = req.body;
        const casoAtualizado = casosRepository.update(id, dadosParciais);
        if (!casoAtualizado) {
            return res.status(404).send('Caso não encontrado');
        }
    
        res.json(casoAtualizado);
    },

    delete(req, res) {
        const id = req.params.id;
        const sucesso = casosRepository.delete(id);
        if (!sucesso) {
            return res.status(404).send('Caso não encontrado');
        }
        res.status(204).send();
    }
};
