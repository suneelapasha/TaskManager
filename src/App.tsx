import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditTaskDialog from './components/EditTaskDialog';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskAPI';

type Task = {
  id: string;
  title: string;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        toast.error('Error fetching tasks');
      }
    };
    
    loadTasks();
  }, []);

  const handleAddTask = async (title: string) => {
    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
    setIsEditing(true);
  };

  const handleUpdateTask = async (title: string) => {
    if (!title.trim()) {
      toast.warn('Task title cannot be empty');
      return;
    }

    if (editTaskId !== null) {
      try {
        const updatedTask = await updateTask(editTaskId, title);
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        setIsEditing(false);
        setEditTaskId(null);
        setEditTaskTitle('');
        toast.success('Task updated successfully');
      } catch (error) {
        toast.error('Failed to update task');
      }
    }
  };


  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id); 
      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#222',
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: '#333', color: '#ffffff', padding: '2rem', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: '2rem' }}>
          My Tasks
        </Typography>

        <TaskForm onAdd={handleAddTask} />

        <Typography variant="h6" gutterBottom>
          To do
        </Typography>
        
        {tasks.length > 0 ? <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} /> : <p>No pending task</p>}

        <EditTaskDialog
          open={isEditing}
          title={editTaskTitle}
          onClose={() => setIsEditing(false)}
          onSave={handleUpdateTask}
          onTitleChange={(e) => setEditTaskTitle(e.target.value)}
        />

        <ToastContainer />
      </Container>
    </Box>
  );
};

export default App;
