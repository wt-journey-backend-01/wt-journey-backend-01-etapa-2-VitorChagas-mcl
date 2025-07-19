const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes");

app.use('/casos', casosRoutes);
app.use('/agentes', agentesRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
    const errorResponse = {
        status: err.status || 500,
        message: err.message || 'Erro interno do servidor',
        errors: err.errors || []
    };
    res.status(errorResponse.status).json(errorResponse);
});

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});


