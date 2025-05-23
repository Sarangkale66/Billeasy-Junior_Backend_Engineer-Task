import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const addBook = async (req: Request, res: Response) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    res.status(400).json({ message: 'Title, author, and genre are required.' });
    return;
  }

  try {
    const book = await prisma.book.create({ data: { title, author, genre } });
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  const { author, genre, page = '1', limit = '10' } = req.query;

  const filters: any = {};
  if (author) filters.author = { contains: String(author), mode: 'insensitive' };
  if (genre) filters.genre = { contains: String(genre), mode: 'insensitive' };

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  try {
    const books = await prisma.book.findMany({
      where: filters,
      skip,
      take,
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookDetails = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        reviews: {
          select: { rating: true, comment: true, userId: true },
        },
      },
    });

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const avgRating = book.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / (book.reviews.length || 1);

    res.json({ ...book, averageRating: avgRating });
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ message: 'Search query is required' });
    return;
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    res.json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
