const uuid = require('uuid');

const agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    }
];

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}

function create(novoAgente) {
    novoAgente.id = uuid.v4();
    agentes.push(novoAgente);
    return novoAgente;
}

function update(id, agenteAtualizado) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return null;

    agentes[index] = { ...agentes[index], ...agenteAtualizado };
    agentes[index].id = id
    return agentes[index];
}

function deleteAgente(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return false;

    agentes.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteAgente
};
