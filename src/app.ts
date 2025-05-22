import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';
import reviewRoutes from './routes/reviewRoutes';
import { login, signup } from './controllers/authController';
import { searchBooks } from './controllers/bookController';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
                                              
app.post('/signup', signup); // POST /signup
app.post('/login', login); // POST /login
app.use('/books', bookRoutes);   // All book-related routes
app.use('/reviews', reviewRoutes); // PUT /reviews/:id, DELETE /reviews/:id
app.get('/search', searchBooks); // Addon

export default app;
