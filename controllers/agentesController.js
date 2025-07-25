const agentesRepository = require('../repositories/agentesRepository');

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  const today = new Date();
  return !isNaN(date.getTime()) && date <= today;
}

module.exports = {
    findAll(req, res) {
        let agentes = agentesRepository.findAll();
        const { cargo, sort } = req.query;

        if (cargo) {
            agentes = agentes.filter(agente =>
                agente.cargo.toLowerCase() === cargo.toLowerCase()
            );
        }

        if (sort === 'dataDeIncorporacao') {
            agentes = agentes.sort((a, b) =>
                new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
            );
        } else if (sort === '-dataDeIncorporacao') {
            agentes = agentes.sort((a, b) =>
                new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
            );
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
        const errors = [];
        if (!nome) errors.push({ field: "nome", message: "Nome é obrigatório" });
        if (!cargo) errors.push({ field: "cargo", message: "Cargo é obrigatório" });
        if (!dataDeIncorporacao || !isValidDate(dataDeIncorporacao)) {
        errors.push({ field: "dataDeIncorporacao", message: "Data inválida ou no futuro" });
        }

        if (errors.length > 0) {
        return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const agenteCriado = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
        res.status(201).json(agenteCriado);
  },


    update(req, res) {
        const id = req.params.id;
        const { nome, dataDeIncorporacao, cargo, id: idBody } = req.body;

        if (idBody && idBody !== id) {
            return res.status(400).json({ message: "Não é permitido alterar o ID do agente." });
        }

        const errors = [];
        if (!nome) errors.push({ field: "nome", message: "Nome é obrigatório" });
        if (!cargo) errors.push({ field: "cargo", message: "Cargo é obrigatório" });
        if (!dataDeIncorporacao || !isValidDate(dataDeIncorporacao)) {
            errors.push({ field: "dataDeIncorporacao", message: "Data inválida ou no futuro" });
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const agente = agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });
        if (!agente) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agente);
    },

    partialUpdate(req, res) {
        const id = req.params.id;
        const dadosAtualizados = { ...req.body };

        if ('id' in dadosAtualizados) {
            delete dadosAtualizados.id;
        }

        const errors = [];

        if ('nome' in dadosAtualizados && !dadosAtualizados.nome) {
            errors.push({ field: "nome", message: "Nome não pode ser vazio" });
        }

        if ('cargo' in dadosAtualizados && !dadosAtualizados.cargo) {
            errors.push({ field: "cargo", message: "Cargo não pode ser vazio" });
        }

        if ('dataDeIncorporacao' in dadosAtualizados && !isValidDate(dadosAtualizados.dataDeIncorporacao)) {
            errors.push({ field: "dataDeIncorporacao", message: "Data inválida ou no futuro" });
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const agenteAtualizado = agentesRepository.update(id, dadosAtualizados);
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
