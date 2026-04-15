const taskService = require('../services/taskService');
 
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            resolve(JSON.parse(body));
        });
    });
};

const createTask = async (req, res) => {
    try {
        const body = await getRequestBody(req);
 
        if (!body.title || body.title.trim() === '') {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                message: 'O campo "title" é obrigatório'
            }));
        }
 
        const task = taskService.addTask(body.title.trim());
 
        res.statusCode = 201; 
        res.end(JSON.stringify(task));
 
    } catch (erro) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Erro interno no servidor' }));
    }
};
 
const listTasks = (req, res) => {
    try {
        const tasks = taskService.getTasks();
 
        res.statusCode = 200;
        res.end(JSON.stringify(tasks));
 
    } catch (erro) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Erro interno no servidor' }));
    }
};
 
const getTaskById = (req, res, id) => {
    try {
        const task = taskService.getTaskById(id);
 
        if (!task) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: 'Tarefa não encontrada'
            }));
        }
 
        res.statusCode = 200;
        res.end(JSON.stringify(task));
 
    } catch (erro) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Erro interno no servidor' }));
    }
};
 
const updateTask = async (req, res, id) => {
    try {
        const body = await getRequestBody(req);
 
        if (body.title === undefined && body.completed === undefined) {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                message: 'Envie ao menos "title" ou "completed" para atualizar'
            }));
        }

        if (body.completed !== undefined && typeof body.completed !== 'boolean') {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                message: 'O campo "completed" deve ser true ou false'
            }));
        }
 
        const task = taskService.updateTask(id, body);
 
        if (!task) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: 'Tarefa não encontrada'
            }));
        }
 
        res.statusCode = 200;
        res.end(JSON.stringify(task));
 
    } catch (erro) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Erro interno no servidor' }));
    }
};
 
const deleteTask = (req, res, id) => {
    try {
        const success = taskService.deleteTask(id);
 
        if (!success) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: 'Tarefa não encontrada'
            }));
        }
 
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Tarefa removida com sucesso' }));
 
    } catch (erro) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Erro interno no servidor' }));
    }
};
 
module.exports = {
    createTask,
    listTasks,
    getTaskById,
    updateTask,
    deleteTask
};
 