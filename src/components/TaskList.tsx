import React, {useState} from 'react';
import { List, ListItem, ListItemText, Paper, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Task = {
  id: string;
  title: string;
};

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const handleDeleteClick = async (id: string) => {
    setDeletingTaskId(id);
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <Paper key={task.id} sx={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#444' }}>
          <ListItem>
            <ListItemText primary={task.title} primaryTypographyProps={{ style: { color: '#fff' } }} />
            <IconButton color="inherit" onClick={() => onEdit(task)}>
              <EditIcon sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => handleDeleteClick(task.id)}
              disabled={deletingTaskId === task.id}
            >
              {deletingTaskId === task.id ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                <DeleteIcon sx={{ color: '#fff' }} />
              )}
            </IconButton>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default TaskList;
