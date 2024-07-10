import express from 'express'
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authUserController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/logout', logoutUser);


export default router;