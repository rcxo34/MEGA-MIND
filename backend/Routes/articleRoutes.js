import express from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticleByDay, getArticleById, updateArticle } from '../Controllers/articleController.js';
const router = express.Router();

router.post('/create', createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.get('/day/:day', getArticleByDay);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;