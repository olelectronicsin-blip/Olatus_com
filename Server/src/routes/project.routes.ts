import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', authenticate, authorizeAdmin, createProject);
router.put('/:id', authenticate, authorizeAdmin, updateProject);
router.delete('/:id', authenticate, authorizeAdmin, deleteProject);

export default router;
