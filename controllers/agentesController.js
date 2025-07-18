
const agentesRepository = require('../repositories/agentesRepository');

module.exports = {
    findAll(req, res) {
        const agentes = agentesRepository.findAll();
        if (!agentes || agentes.length === 0) {
            return res.status(404).send('Nenhum agente encontrado');
        }
        res.json(agentes);
    },

    findById(req, res) {
        const id = req.params.id;
        const agente = agentesRepository.findById(id);
        if (!agente) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agente);
    },

    create(req, res) {
        const novoAgente = req.body;
        const agenteCriado = agentesRepository.create(novoAgente);
        res.status(201).json(agenteCriado);
    },

    update(req, res) {
        const id = req.params.id;
        const dadosAtualizados = req.body;
        const agente = agentesRepository.update(id, dadosAtualizados);
        if (!agente) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agente);
    },

    delete(req, res) {
        const id = req.params.id;
        const sucesso = agentesRepository.delete(id);
        if (!sucesso) {
            return res.status(404).send('Agente não encontrado');
        }
        res.status(204).send();
    }
};
