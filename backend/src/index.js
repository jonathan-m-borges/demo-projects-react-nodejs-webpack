const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const config = require('./config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(req, res, next) {
    const { method, url } = req;
    const log = `[${method}] ${url}`;
    console.time(log);
    next();
    console.timeEnd(log);
}

function validateId(req, res, next) {
    const { id } = req.params;
    if (!isUuid(id)) {
        return res.status(400).json({ error: `Id ${id} is invalid.` });
    }
    return next();
}

function validateProjectExist(req, res, next) {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) {
        return res.status(404).json('Project not found.');
    }

    req.projectIndex = projectIndex;
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateId, validateProjectExist);

app.get('/projects', (req, res) => {
    return res.json(projects);
});

app.get('/projects/:id', (req, res) => {
    return res.json(projects[req.projectIndex]);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;
    const id = uuid();
    const project = { id, title, owner };
    projects.push(project);
    return res.json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;
    const project = { id, title, owner };
    projects[req.projectIndex] = project;
    return res.json(project);
})

app.delete('/projects/:id', (req, res) => {
    projects.splice(req.projectIndex, 1);
    return res.status(204).send();
})

app.listen(config.port, () => {
    console.log(`Application started listen on port ${config.port} !`)
});