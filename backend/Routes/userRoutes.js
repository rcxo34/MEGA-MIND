import express from 'express';
import { 
    allUsers, 
    createUser, 
    deleteUser, 
    getUserById, 
    loginUser, 
    updatePassword,
    getUserScore,
    updateUserScore,
    getUserDay,
    updateUserDay,
    dayCompleted,
    addScore,
    completedDaysList
} from '../Controllers/userController.js';
import { authenticateToken, authorizeRole } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/', allUsers);
router.get('/:id', getUserById);
router.put('/:id', updatePassword);
router.delete('/:id', deleteUser);

router.get('/:userId/score', authenticateToken, getUserScore);
router.put('/:userId/score', authenticateToken, updateUserScore);
router.get('/:userId/day', authenticateToken, getUserDay);
router.put('/:userId/day', authenticateToken,updateUserDay);

router.post('/:userId/dayCompleted', authenticateToken, dayCompleted);
router.post('/:userId/addScore', authenticateToken, addScore);

router.get('/:userId/completedDaysList', authenticateToken, completedDaysList);

router.get('/admin/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

// User route
router.get('/user/user', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome, User!' });
});

export default router;