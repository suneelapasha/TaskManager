
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Parse from './parseConfig';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

interface Task {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the Task Management API');
  });

app.get('/tasks', async (req: Request, res: Response) => {
  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);

  try {
    const results = await query.find();
    const tasks: Task[] = results.map((task: Parse.Object) => ({
      id: task.id,
      title: task.get('title'),
      createdAt: task.get('createdAt'),
      updatedAt: task.get('updatedAt')
    }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const Task = Parse.Object.extend('Task');
  const task = new Task();
  task.set('title', title);

  try {
    const newTask = await task.save();
    res.status(201).json({
      id: newTask.id,
      title: newTask.get('title'),
      createdAt: newTask.get('createdAt'),
      updatedAt: newTask.get('updatedAt'),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);

  try {
    const task = await query.get(id);
    task.set('title', title);
    const updatedTask = await task.save();
    res.json({
      id: updatedTask.id,
      title: updatedTask.get('title'),
      createdAt: updatedTask.get('createdAt'),
      updatedAt: updatedTask.get('updatedAt'),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);

  try {
    const task = await query.get(id);
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
