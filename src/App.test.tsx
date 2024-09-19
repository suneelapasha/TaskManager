import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import TaskForm from './components/TaskForm';

jest.mock('react-toastify', () => ({
  toast: {
    warn: jest.fn(),
  },
}));

describe('TaskForm', () => {
  test('calls onAdd with the correct task title when the Add button is clicked', async () => {
   
    const onAddMock = jest.fn();
    render(<TaskForm onAdd={onAddMock} />);

    const inputElement = screen.getByPlaceholderText(/add a task/i);
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.type(inputElement, 'New Task');
    userEvent.click(addButton);
    await waitFor(() => expect(onAddMock).toHaveBeenCalledWith('New Task'));
    expect(inputElement).toHaveValue('');
  });

  test('shows a warning toast if the input is empty when the Add button is clicked', () => {
    const onAddMock = jest.fn();
    render(<TaskForm onAdd={onAddMock} />);
    const addButton = screen.getByRole('button', { name: /add/i });
    userEvent.click(addButton);
    waitFor(() => expect(toast.warn).toHaveBeenCalledWith('Task title cannot be empty'));
  });
});
