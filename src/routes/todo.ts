import express from 'express';
import Todo from '../models/todo';
import { formatTodoResponse } from '../utils/formatTodo';
import { createTodoValidator } from '../middleware/createTodoValidator';
import { updateTodoValidator } from '../middleware/updateTodoValidator';
import { deleteTodoValidator } from '../middleware/deleteTodoValidator';
import { GENERAL_SERVER_ERROR_MESSAGE, REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE } from '../utils/constants';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', createTodoValidator, async (req, res) => {
  try {
    const { userId, title, description, isCompleted } = req.body;

    // validate user exists if auth in action

    // validate title is unique per user todos, however that's not a requirement for now

    const todo = new Todo({
      userId,
      title,
      description,
      isCompleted: isCompleted !== undefined ? isCompleted : isCompleted
    });

    const savedTodo = await todo.save();

    // Format the response using the formatting function to validate no sensitive or inappropriate data return
    const formattedTodo = formatTodoResponse(savedTodo);

    res.json(formattedTodo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: GENERAL_SERVER_ERROR_MESSAGE });
  }
});

// PUT route to update a todo
router.put('/:id', updateTodoValidator, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Todo ID' });
    }

    // Find the existing todo
    const existingTodo = await Todo.findById(id);

    // Check if the todo exists
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update the todo using destructuring and nullish coalescing
    existingTodo.set({
      title: title ?? existingTodo.title,
      description: description ?? existingTodo.description,
      isCompleted: isCompleted !== undefined ? isCompleted : existingTodo.isCompleted,
    });

    // Save the updated todo
    const updatedTodo = await existingTodo.save();

    // Format the response using the formatting function
    const formattedTodo = formatTodoResponse(updatedTodo);

    res.json(formattedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: GENERAL_SERVER_ERROR_MESSAGE });
  }
});

router.delete('/:id', deleteTodoValidator, async (req, res) => {
  try {
    const { id } = req.params;

    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Todo ID' });
    }

    // Find the existing todo
    const existingTodo = await Todo.findById({ _id: id, user: userId });

    // Check if the todo exists
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Check if the todo created by the user
    if (existingTodo.userId !== userId) {
      return res.status(403).json({ error: 'Not Authorized' });
    }

    // Delete the todo
    const result = await Todo.findByIdAndDelete(id);

    return res.json({ message: 'Todo deleted successfully' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: GENERAL_SERVER_ERROR_MESSAGE });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Todo ID' });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const formattedTodo = formatTodoResponse(todo);

    res.json(formattedTodo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: GENERAL_SERVER_ERROR_MESSAGE });
  }
});

// Get all todos for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE });
    }

    const todos = await Todo.find({ userId: userId });

    res.json(todos.map(todo => formatTodoResponse(todo)));
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: GENERAL_SERVER_ERROR_MESSAGE });
  }
});

export default router;
