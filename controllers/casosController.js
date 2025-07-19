const uuid = require('uuid');

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    }
];

const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

module.exports = {
    findAll(req, res) {
        const { status } = req.query;
        let casos = casosRepository.findAll();

        if (status) {
            casos = casos.filter(caso => caso.status === status);
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
        // Validação
        if (!novoCaso.titulo || !novoCaso.descricao || !novoCaso.status || !novoCaso.agente_id) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: [
                    !novoCaso.titulo ? { field: "titulo", message: "Título é obrigatório" } : null,
                    !novoCaso.descricao ? { field: "descricao", message: "Descrição é obrigatória" } : null,
                    !novoCaso.status ? { field: "status", message: "Status é obrigatório aberto ou solucionado" } : null,
                    !novoCaso.agente_id ? { field: "agente_id", message: "Agente é obrigatório" } : null
                ].filter(Boolean)
            });
        }

        if (!statusPermitidos.includes(novoCaso.status)) {
            return res.status(400).json({
                errors: [{ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" }]
            });
        }
        const agenteExiste = agentesRepository.findById(novoCaso.agente_id);
        if (!agenteExiste) {
            return res.status(404).json({ message: 'Agente não encontrado para o agente_id informado' });
        }

        const casoCriado = casosRepository.create(novoCaso);
        res.status(201).json(casoCriado);
    },

    

    update(req, res) {
        const id = req.params.id;
        const dadosAtualizados = { ...req.body };
        if ('id' in dadosAtualizados) {
            delete dadosAtualizados.id;
        }
        if (dadosAtualizados.status && !['aberto', 'solucionado'].includes(dadosAtualizados.status)) {
            return res.status(400).json({
            errors: [{ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" }]
            });
        }
        const caso = casosRepository.update(id, dadosAtualizados);
        if (!caso) return res.status(404).send('Caso não encontrado');
        res.json(caso);
    },

    partialUpdate(req, res) {
        const id = req.params.id;
        const dadosAtualizados = { ...req.body };
        if ('id' in dadosAtualizados) {
            delete dadosAtualizados.id;
        }
        const casoAtualizado = casosRepository.update(id, dadosAtualizados);
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
