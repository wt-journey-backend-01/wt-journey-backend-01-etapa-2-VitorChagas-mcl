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
        const { nome, dataDeIncorporacao, cargo } = req.body;
            if (!nome || !dataDeIncorporacao || !cargo) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: [
                nome ? null : { field: "nome", message: "Nome é obrigatório" },
                dataDeIncorporacao ? null : { field: "dataDeIncorporacao", message: "Data é obrigatória e deve estar no formato YYYY-MM-DD" },
                cargo ? null : { field: "cargo", message: "Cargo é obrigatório" }
                ].filter(Boolean)
            });
            }
        const agenteCriado = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
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

    partialUpdate(req, res) {
        const id = req.params.id;
        const dadosParciais = req.body;
        const agenteAtualizado = agentesRepository.update(id, dadosParciais);
        if (!agenteAtualizado) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agenteAtualizado);
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
