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

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(novoCaso) {
    novoCaso.id = uuid.v4();
    novoCaso.data = new Date().toISOString();
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, dadosAtualizados) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;
    casos[index] = { ...casos[index], ...dadosAtualizados };
    casos[index].id = id;
    return casos[index];
}

function deleteCaso(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return false;

    casos.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteCaso
};
