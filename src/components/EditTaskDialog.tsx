import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

type EditTaskDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: (title: string) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ open, title, onClose, onSave, onTitleChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          fullWidth
          value={title}
          onChange={onTitleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(title)} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
