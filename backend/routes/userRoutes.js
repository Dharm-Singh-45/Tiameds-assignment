import express from 'express';
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.post('/', protect, addUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router; 