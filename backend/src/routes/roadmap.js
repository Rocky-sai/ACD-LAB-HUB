import express from 'express';
import {
  getAllRoadmaps,
  getRoadmapByYear,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
} from '../controllers/roadmapController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRoadmaps);
router.get('/:year', getRoadmapByYear);
router.post('/', authMiddleware, adminMiddleware, createRoadmap);
router.put('/:id', authMiddleware, adminMiddleware, updateRoadmap);
router.delete('/:id', authMiddleware, adminMiddleware, deleteRoadmap);

export default router;
