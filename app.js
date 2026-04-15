const http = require('http');

// Importando as rotas
const taskRoutes = require('./src/routes/taskRoutes');

// Criando o sevidor
const server = http.createServer((req, res) => {

    // Define cabeçalho JSON
    res.setHeader('Content-Type', 'application/json');

    // Chama o roteador
    taskRoutes(req, res);
});

// Porta
const PORT = 3000;

// Inicia servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});