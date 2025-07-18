const uuid = require('uuid');

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    //Demais objetos
]

const agentesRepository = require('../repositories/agentesRepository');
const casosRepository = require('../repositories/casosRepository');

function findAll() {
    return casos;
}

function isValidUUID(id) {
    return uuid.validate(id);
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(req, res) {
    novoCaso.id = uuid.v4();
    if (!novoCaso.titulo || !novoCaso.descricao || !novoCaso.status || !novoCaso.agente_id) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }
    const agenteExiste = agentesRepository.findById(novoCaso.agente_id);
    if (!agenteExiste) {
        return res.status(404).json({ message: 'Agente não encontrado para o agente_id informado' });
    }
    const casoCriado = casosRepository.create(novoCaso);
    res.status(201).json(casoCriado);
}

function update(id, casoAtualizado) {
    const caso = casos.find(caso => caso.id === id);
    if (!caso) {
        return null;
    }
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos[index] = { ...casos[index], ...casoAtualizado };
        return casos[index];
    }
    return null;
}

function partialUpdate(req, res) {
    const id = req.params.id;
    const dadosParciais = req.body;
    const casoAtualizado = casosRepository.update(id, dadosParciais);
    if (!casoAtualizado) {
        return res.status(404).send('Caso não encontrado');
    }
    res.json(casoAtualizado);
}

function deleteCaso(id) {
    const caso = casos.find(caso => caso.id === id);
    if (!caso) {
        return false;
    }
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    partialUpdate,
    delete: deleteCaso
};