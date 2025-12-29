import { Router } from 'express';
import {
  createServiceRequest,
  getAllServiceRequests,
  getServiceRequestById,
  getServiceRequestsByEmail,
  updateServiceRequestStatus,
  updateServiceRequestPricing,
  addServiceRequestNote,
  deleteServiceRequest,
  createInternshipApplication,
  getAllInternshipApplications,
  getInternshipApplicationById,
  updateInternshipApplicationStatus,
  getInternshipStatistics,
} from '../controllers/service-request.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// ========== SERVICE REQUEST ROUTES ==========

// Public routes
router.post('/service-requests', upload.array('files', 10), createServiceRequest);
router.get('/service-requests/email/:email', getServiceRequestsByEmail);

// Admin routes (protected)
router.get('/service-requests', authenticate, authorizeAdmin, getAllServiceRequests);
router.get('/service-requests/:id', authenticate, authorizeAdmin, getServiceRequestById);
router.patch('/service-requests/:id/status', authenticate, authorizeAdmin, updateServiceRequestStatus);
router.patch('/service-requests/:id/pricing', authenticate, authorizeAdmin, updateServiceRequestPricing);
router.post('/service-requests/:id/notes', authenticate, authorizeAdmin, addServiceRequestNote);
router.delete('/service-requests/:id', authenticate, authorizeAdmin, deleteServiceRequest);

// ========== INTERNSHIP APPLICATION ROUTES ==========

// Public routes
router.post('/internships/apply', upload.single('resume'), createInternshipApplication);
// Back-compat alias for older client endpoint
router.post('/internship-applications', upload.single('resume'), createInternshipApplication);

// Admin routes (protected)
router.get('/internships/applications', authenticate, authorizeAdmin, getAllInternshipApplications);
router.get('/internships/applications/:id', authenticate, authorizeAdmin, getInternshipApplicationById);
router.patch('/internships/applications/:id/status', authenticate, authorizeAdmin, updateInternshipApplicationStatus);
router.get('/internships/statistics', authenticate, authorizeAdmin, getInternshipStatistics);

export default router;
