import { Router } from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getInbox,
} from '../controllers/admin.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/inbox', getInbox);

export default router;
