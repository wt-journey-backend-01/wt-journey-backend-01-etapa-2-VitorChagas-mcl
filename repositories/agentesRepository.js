const agentes = [
    {
        "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
        "nome": "Rommel Carneiro",
        "dataDeIncorporacao": "1992/10/04",
        "cargo": "delegado"
    },
]

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}
function create(novoAgente) {
    if (!novoAgente.nome || !novoAgente.cargo) {
        alert('Nome e cargo são obrigatórios');
    }
    agentes.push(novoAgente);
    return novoAgente;
}

function update(id, agenteAtualizado) {
    const agente = agentes.find(agente => agente.id === id);
    if (!agente) {
        return null;
    }
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        agentes[index] = { ...agentes[index], ...agenteAtualizado };
        return agentes[index];
    }
    return null;
}

function deleteAgente(id) {
    const agente = agentes.find(agente => agente.id === id);
    if (!agente) {
        return false;
    }
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        agentes.splice(index, 1);
        return true;
    }
    return false;
}

const uuid = require('uuid');

module.exports = {
    findAll() {
        return agentes;
    },
    findById(id) {
        return agentes.find(agente => agente.id === id);
    },
    create(novoAgente) {
        novoAgente.id = uuid.v4();
        novoAgente.data = new Date().toISOString();
        agentes.push(novoAgente);
        return novoAgente;
    },
    update(id, agenteAtualizado) {
        const agente = agentes.find(agente => agente.id === id);
        if (!agente) {
            return null;
        }
        const index = agentes.findIndex(agente => agente.id === id);
        if (index !== -1) {
            agentes[index] = { ...agentes[index], ...agenteAtualizado };
            return agentes[index];
        }
        return null;
    },
    delete(id) {
        const agente = agentes.find(agente => agente.id === id);
        if (!agente) {
            return false;
        }
        const index = agentes.findIndex(agente => agente.id === id);
        if (index !== -1) {
            agentes.splice(index, 1);
            return true;
        }
        return false;
    }
}



