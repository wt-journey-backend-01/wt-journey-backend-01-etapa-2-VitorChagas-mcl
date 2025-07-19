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
