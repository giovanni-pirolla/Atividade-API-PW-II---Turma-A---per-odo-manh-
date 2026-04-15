const taskController = require('../controllers/taskController');
 
module.exports = (req, res) => {
 
    const url    = req.url;
    const method = req.method;

    if (url === '/tasks' && method === 'GET') {
        return taskController.listTasks(req, res);
    }

    if (url === '/tasks' && method === 'POST') {
        return taskController.createTask(req, res);
    }

    if (url.startsWith('/tasks/') && method === 'GET') {
        const id = url.split('/')[2];
        return taskController.getTaskById(req, res, id);
    }
 
    if (url.startsWith('/tasks/') && method === 'PUT') {
        const id = url.split('/')[2];
        return taskController.updateTask(req, res, id);
    }
 
    if (url.startsWith('/tasks/') && method === 'DELETE') {
        const id = url.split('/')[2];
        return taskController.deleteTask(req, res, id);
    }


    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};
 