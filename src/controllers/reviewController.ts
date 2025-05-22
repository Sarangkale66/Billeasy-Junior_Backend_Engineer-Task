import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const submitReview = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const bookId = parseInt(req.params.id);
  const { rating, comment } = req.body;

  if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
    res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    return;
  }

  if (!comment) {
    res.status(400).json({ message: 'Comment is required' });
    return;
  }

  try {
    const exists = await prisma.review.findUnique({
      where: { userId_bookId: { userId: user.id, bookId } },
    });

    if (exists) {
      res.status(400).json({ message: 'You already reviewed this book' });
      return;
    }

    const review = await prisma.review.create({
      data: { rating:Number(rating), comment, bookId, userId: user.id },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = parseInt(req.params.id);
  const { rating, comment } = req.body;

  if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
    res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    return;
  }

  if (!comment) {
    res.status(400).json({ message: 'Comment is required' });
    return;
  }

  try {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review || review.userId !== user.id) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { rating:Number(rating), comment },
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = parseInt(req.params.id);

  try {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review || review.userId !== user.id) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    await prisma.review.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};