const express = require('express')
const app = express();
const PORT = 3000;
const agentesRouter = require("./routes/agentesRouter")

app.use(agentesRouter);

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Departamento de Polícia!');
});

