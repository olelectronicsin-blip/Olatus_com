import { Router } from 'express';
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contact.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', submitContactForm);
router.get('/', authenticate, authorizeAdmin, getAllContacts);
router.get('/:id', authenticate, authorizeAdmin, getContactById);
router.patch('/:id', authenticate, authorizeAdmin, updateContactStatus);
router.delete('/:id', authenticate, authorizeAdmin, deleteContact);

export default router;
