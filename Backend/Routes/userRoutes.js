import express from 'express';
import { authUser, deleteUser, getUser, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', authUser); 
router.route('/profile').get(protect,getUserProfile);
router.route('/').post(registerUser);
router.route('/profile').put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers);
router.route('/admin/:id').delete(protect, admin, deleteUser);
router.route('/:id').get(protect, admin, getUser);
router.route('/admin/:id').put(protect, admin, updateUser);

export default router;