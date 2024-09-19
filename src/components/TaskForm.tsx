import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';


type TaskFormProps = {
  onAdd: (title: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAdd(newTaskTitle);
      setNewTaskTitle('');
    } else {
        toast.warn('Task title cannot be empty');
      }
  };

  return (
    <Box display="flex" alignItems="center" sx={{ backgroundColor: '#444', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem'}}>
      <TextField
        placeholder="Add a task"
        fullWidth
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <IconButton color="primary" onClick={handleAddTask} aria-label="add">
        <AddIcon sx={{ color: '#fff' }} />
      </IconButton>
    </Box>
  );
};

export default TaskForm;
