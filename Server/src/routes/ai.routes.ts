import express from 'express';
import { chatAI } from '../controllers/ai.controller.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Basic rate limiter to protect the AI proxy endpoint
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/chat', limiter, chatAI);

export default router;
