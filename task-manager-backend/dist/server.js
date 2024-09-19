"use strict";
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const PORT = 3001;
// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// // In-memory task storage
// type Task = {
//   id: number;
//   title: string;
//   createdAt: Date;
//   updatedAt: Date;
// };
// const tasks: Task[] = [];
// // Get all tasks
// app.get('/tasks', (req, res) => {
//   res.json(tasks);
// });
// // Create a new task
// app.post('/tasks', (req, res) => {
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({ error: 'Title is required' });
//   }
//   const newTask: Task = {
//     id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // Ensure unique ID
//     title,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });
// // Update a task
// app.put('/tasks/:id', (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   const task = tasks.find(t => t.id === parseInt(id));
//   if (!task) {
//     return res.status(404).json({ error: 'Task not found' });
//   }
//   if (!title) {
//     return res.status(400).json({ error: 'Title is required' });
//   }
//   task.title = title;
//   task.updatedAt = new Date();
//   res.json(task);
// });
// // Delete a task
// app.delete('/tasks/:id', (req, res) => {
//     const { id } = req.params;
//     const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
//     if (taskIndex > -1) {
//       tasks.splice(taskIndex, 1);
//       res.status(204).send(); // No content
//     } else {
//       res.status(404).send('Task not found');
//     }
//   });
// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Parse = require('./parseConfig');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Task = Parse.Object.extend('Task');
    const query = new Parse.Query(Task);
    try {
        const results = yield query.find();
        // Convert Parse objects to plain JavaScript objects
        const tasks = results.map((task) => ({
            id: task.id,
            title: task.get('title'),
            createdAt: task.get('createdAt'),
            updatedAt: task.get('updatedAt')
        }));
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
}));
// POST /tasks - Create a new task
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Task title is required' });
    }
    const Task = Parse.Object.extend('Task');
    const task = new Task();
    task.set('title', title);
    try {
        const newTask = yield task.save();
        res.status(201).json({
            id: newTask.id,
            title: newTask.get('title'),
            createdAt: newTask.get('createdAt'),
            updatedAt: newTask.get('updatedAt'),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
}));
// PUT /tasks/:id - Update a task
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Task title is required' });
    }
    const Task = Parse.Object.extend('Task');
    const query = new Parse.Query(Task);
    try {
        const task = yield query.get(id);
        task.set('title', title);
        const updatedTask = yield task.save();
        res.json({
            id: updatedTask.id,
            title: updatedTask.get('title'),
            createdAt: updatedTask.get('createdAt'),
            updatedAt: updatedTask.get('updatedAt'),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
}));
// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Task = Parse.Object.extend('Task');
    const query = new Parse.Query(Task);
    try {
        const task = yield query.get(id);
        yield task.destroy();
        res.status(204).send(); // No content
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
