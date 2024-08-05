import Question from "../Models/questionModel.js";

// @desc    Create a new Question
// @route   POST questions/create
const createQuestion = async (req, res) => {
    try {
      const { day, question, options, solution, explanation } = req.body;
  
      const newQuestion = new Question({
        day,
        question,
        options,
        solution,
        explanation,
      });
  
      const savedQuestion = await newQuestion.save();
  
      res.status(201).json({ message: 'Question created successfully', question: savedQuestion });
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ message: 'Failed to create question' });
    }
  };
  
// @desc    Get all questions
// @route   GET questions
const getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error retrieving questions:', error);
      res.status(500).json({ message: 'Failed to retrieve questions' });
    }
  };

// @desc    Get all questions by day
// @route   GET questions/:id
const getAllQuestionsByDay = async (req, res) => {
    try {
      const { day } = req.params;
      console.log(day)
      const questions = await Question.find({ day });
      
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: `No questions found for day ${day}` });
      }
  
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error retrieving questions by day:', error);
      res.status(500).json({ message: 'Failed to retrieve questions by day' });
    }
  };

// @desc    Get all questions by id
// @route   POST questions/create
const getQuestionById = async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json(question);
    } catch (error) {
      console.error('Error retrieving question:', error);
      res.status(500).json({ message: 'Failed to retrieve question' });
    }
  };

// @desc    Update questions by id
// @route   POST questions/create
const updateQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const { day, question, solutions, explanations } = req.body;
  
      // Find the question by ID
      let updatedQuestion = await Question.findById(id);
  
      if (!updatedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Update the question fields
      updatedQuestion.day = day;
      updatedQuestion.question = question;
      updatedQuestion.solutions = solutions;
      updatedQuestion.explanations = explanations;
  
      // Save the updated question
      await updatedQuestion.save();
  
      res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ message: 'Failed to update question' });
    }
  };

// @desc    Delete questions by id
// @route   POST questions/create
const deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await Question.findByIdAndDelete(id);
  
      if (!deletedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ message: 'Failed to delete question' });
    }
  };

  export { createQuestion, getAllQuestions, getAllQuestionsByDay, getQuestionById, updateQuestion, deleteQuestion };