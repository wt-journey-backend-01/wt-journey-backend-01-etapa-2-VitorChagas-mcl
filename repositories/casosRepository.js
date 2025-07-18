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

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(novoCaso) {
    novoCaso.id = uuid.v4();
    if (!novoCaso.titulo || !novoCaso.descricao) {
        throw new Error('Título e descrição são obrigatórios');
    }
    casos.push(novoCaso);
    return novoCaso;
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

const uuid = require('uuid');

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteCaso
};

const agentesRepository = require('./agentesRepository');