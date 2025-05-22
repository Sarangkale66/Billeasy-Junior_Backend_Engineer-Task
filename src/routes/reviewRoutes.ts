import express from 'express';
import { updateReview, deleteReview } from '../controllers/reviewController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.put('/:id', protect, updateReview);

router.delete('/:id', protect, deleteReview);

export default router;