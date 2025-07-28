const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

module.exports = {
    findAll(req, res) {
        const { titulo, descricao, status, agente_id } = req.query;
        let casos = casosRepository.findAll();

        if (status) {
            casos = casos.filter(caso => caso.status === status);
        }

        if (agente_id) {
            casos = casos.filter(caso => caso.agente_id === agente_id);
        }

        if (titulo) {
            casos = casos.filter(caso =>
                caso.titulo.toLowerCase().includes(titulo.toLowerCase())
            );
        }

        if (descricao) {
            casos = casos.filter(caso =>
                caso.descricao.toLowerCase().includes(descricao.toLowerCase())
            );
        }

        res.json(casos);
    },

    findById(req, res) {
        const id = req.params.id;
        const caso = casosRepository.findById(id);
        if (!caso) {
            return res.status(404).send('Caso não encontrado');
        }
        res.json(caso);
    },

    create(req, res) {
        const novoCaso = req.body;
        const statusPermitidos = ['aberto', 'solucionado'];
        const errors = [];

        if (!novoCaso.titulo) {
            errors.push({ field: "titulo", message: "Título é obrigatório" });
        }

        if (!novoCaso.descricao) {
            errors.push({ field: "descricao", message: "Descrição é obrigatória" });
        }

        if (!novoCaso.status) {
            errors.push({ field: "status", message: "Status é obrigatório" });
        } else if (!statusPermitidos.includes(novoCaso.status)) {
            errors.push({ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" });
        }

        if (!novoCaso.agente_id) {
            errors.push({ field: "agente_id", message: "Agente é obrigatório" });
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }
        const { validate: isUuid } = require('uuid');

        if (!isUuid(novoCaso.agente_id)) {
        errors.push({ field: "agente_id", message: "agente_id deve ser um UUID válido" });
        }

        const casoCriado = casosRepository.create(novoCaso);
        return res.status(201).json(casoCriado);
    },

    update(req, res) {
        const id = req.params.id;
        const dados = { ...req.body };
        const statusPermitidos = ['aberto', 'solucionado'];

        if ('id' in dados) {
            return res.status(400).json({ status: 400, message: "Não é permitido alterar o ID do caso." });
        }

        const errors = [];

        if (!dados.titulo) errors.push({ field: "titulo", message: "Título é obrigatório" });
        if (!dados.descricao) errors.push({ field: "descricao", message: "Descrição é obrigatória" });
        if (!dados.status) {
            errors.push({ field: "status", message: "Status é obrigatório" });
        } else if (!statusPermitidos.includes(dados.status)) {
            errors.push({ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" });
        }
        if (!dados.agente_id) {
            errors.push({ field: "agente_id", message: "Agente é obrigatório" });
        } else {
            const agenteExiste = agentesRepository.findById(dados.agente_id);
            if (!agenteExiste) {
                return res.status(404).json({ message: 'Agente não encontrado para o agente_id informado' });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const casoAtualizado = casosRepository.update(id, dados);
        if (!casoAtualizado) return res.status(404).send('Caso não encontrado');
        res.json(casoAtualizado);
    },

    partialUpdate(req, res) {
        const id = req.params.id;
        const dados = { ...req.body };
        const statusPermitidos = ['aberto', 'solucionado'];

        if ('id' in dados) {
            return res.status(400).json({ status: 400, message: "Não é permitido alterar o ID do caso." });
        }

        if (Object.keys(dados).length === 0) {
            return res.status(400).json({ status: 400, message: "Nenhum dado para atualizar foi fornecido." });
        }

        const errors = [];

        if ('titulo' in dados && !dados.titulo) {
            errors.push({ field: "titulo", message: "Título não pode ser vazio" });
        }

        if ('descricao' in dados && !dados.descricao) {
            errors.push({ field: "descricao", message: "Descrição não pode ser vazia" });
        }

        if ('status' in dados && !statusPermitidos.includes(dados.status)) {
            errors.push({ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" });
        }

        if ('agente_id' in dados) {
            const agenteExiste = agentesRepository.findById(dados.agente_id);
            if (!agenteExiste) {
                return res.status(404).json({ message: 'Agente não encontrado para o agente_id informado' });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const casoAtualizado = casosRepository.update(id, dados);
        if (!casoAtualizado) {
            return res.status(404).send('Caso não encontrado');
        }

        res.json(casoAtualizado);
    },

    delete(req, res) {
        const id = req.params.id;
        const deletado = casosRepository.delete(id);
        if (!deletado) {
            return res.status(404).send('Caso não encontrado');
        }
        res.status(204).send();
    }
};
