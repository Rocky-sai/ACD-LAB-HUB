import express from 'express';
import { 
  getProgress, 
  updateProgress, 
  updateWeeklyPlanner,
  generateCertificate 
} from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getProgress);
router.post('/update', authMiddleware, updateProgress);
router.post('/weekly-planner', authMiddleware, updateWeeklyPlanner);
router.post('/certificate', authMiddleware, generateCertificate);

export default router;
