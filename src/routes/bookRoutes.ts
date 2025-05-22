import express from 'express';
import { addBook, getBookDetails, getBooks } from '../controllers/bookController';
import { submitReview } from '../controllers/reviewController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, addBook);   
router.get('/', getBooks);
router.post('/:id/reviews', protect, submitReview);
router.get('/:id', getBookDetails);

export default router;
