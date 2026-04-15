// Importando modulos e definindo 
const fs   = require('fs');
const path = require('path');
const { createTask } = require('../models/taskModel');
 
const DB_PATH = path.join(__dirname, '..', '..', 'tasks.json');
 
const lerTarefasDoArquivo = () => {
    if (!fs.existsSync(DB_PATH)) {
        return [];
    }
 
    const conteudo = fs.readFileSync(DB_PATH, 'utf-8');
 
    if (!conteudo.trim()) {
        return [];
    }
 
    return JSON.parse(conteudo);
};
 
const salvarTarefasNoArquivo = (tasks) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
};
 
const gerarProximoId = (tasks) => {
    if (tasks.length === 0) return 1;
 
    const maiorId = Math.max(...tasks.map(t => t.id));
    return maiorId + 1;
};
 
const addTask = (title) => {
    const tasks = lerTarefasDoArquivo();
    const novoId = gerarProximoId(tasks);
 
    const task = createTask(novoId, title);
    tasks.push(task);
 
    salvarTarefasNoArquivo(tasks);
    return task;
};
 

const getTasks = () => {
    return lerTarefasDoArquivo();
};

const getTaskById = (id) => {
    const tasks = lerTarefasDoArquivo();

    const task = tasks.find(t => t.id === Number(id));
    return task || null;
};

const updateTask = (id, dados) => {
    const tasks = lerTarefasDoArquivo();
    const task  = tasks.find(t => t.id === Number(id));
 
    if (!task) return null;
 
    if (dados.title !== undefined) {
        task.title = dados.title;
    }
 
    if (dados.completed !== undefined) {
        task.completed = dados.completed;
    }
 
    salvarTarefasNoArquivo(tasks);
    return task;
};
 
const deleteTask = (id) => {
    const tasks = lerTarefasDoArquivo();
    const index = tasks.findIndex(t => t.id === Number(id));
 
    if (index === -1) return false;
 
    tasks.splice(index, 1);
    salvarTarefasNoArquivo(tasks);
    return true;
};
 
module.exports = {
    addTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};