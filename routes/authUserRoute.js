import express from 'express'
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authUserController.js'
import { protect } from '../middleware/authMiddleware.js'
import { updateUser } from '../controllers/userController.js'
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getMe', protect, getMe);
router.post('/logout', logoutUser);
router.put('/profile', protect, updateUser);


export default router;