import { Router } from 'express';
import {
  getAnalytics,
  logPageView,
  logEvent
} from '../controllers/analytics.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getAnalytics);
router.post('/pageview', logPageView);
router.post('/event', logEvent);

export default router;
