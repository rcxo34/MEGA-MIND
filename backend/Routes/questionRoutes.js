import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getAllQuestionsByDay,
} from '../Controllers/questionController.js';

const router = express.Router();

// POST /questions/create
router.post('/create', createQuestion);

// GET /questions
router.get('/', getAllQuestions);

// GET /questions/:id
router.get('/:id', getQuestionById);

// GET /questions/day/:day
router.get('/day/:day', getAllQuestionsByDay);

// PUT /questions/:id
router.put('/:id', updateQuestion);

// DELETE /questions/:id
router.delete('/:id', deleteQuestion);

export default router;
