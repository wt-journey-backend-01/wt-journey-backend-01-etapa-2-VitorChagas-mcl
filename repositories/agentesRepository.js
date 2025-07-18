const uuid = require('uuid');

const agentes = [
    {
            id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
            nome: "Rommel Carneiro",
            dataDeIncorporacao: "1992/10/04",
            cargo: "delegado"
    },
];

function findAll() {
    return Agentes;
}

function findById(id) {
    return Agentes.find(Agente => Agente.id === id);
}

function create(novoAgente) {
    if (!novoAgente.titulo || !novoAgente.descricao || !novoAgente.status || !novoAgente.agente_id) {
        throw new Error("Campos obrigatórios ausentes.");
    }
    novoAgente.id = uuid.v4();
    novoAgente.data = new Date().toISOString();
    Agentes.push(novoAgente);
    return novoAgente;
}

function update(id, AgenteAtualizado) {
    const index = Agentes.findIndex(Agente => Agente.id === id);
    if (index === -1) return null;

    Agentes[index] = { ...Agentes[index], ...AgenteAtualizado };
    return Agentes[index];
}

function deleteAgente(id) {
    const index = Agentes.findIndex(Agente => Agente.id === id);
    if (index === -1) return false;

    Agentes.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteAgente
};
