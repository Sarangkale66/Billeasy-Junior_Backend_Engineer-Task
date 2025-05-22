import prisma from '../src/prisma/client';
import bcrypt from 'bcrypt';
import { books, reviews, users } from './seedData';

async function main() {
  console.log('🌱 Seeding started');

  // Seed Users
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Users seeded');

  // Seed Books
  for (const book of books) {
    await prisma.book.upsert({
      where: { title: book.title },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        genre: book.genre,
      },
    });
  }

  console.log('✅ Books seeded');

  // Seed Reviews
  for (const review of reviews) {
    const user = await prisma.user.findUnique({ where: { email: review.userEmail } });
    const book = await prisma.book.findUnique({ where: { title: review.bookTitle } });

    if (user && book) {
      await prisma.review.upsert({
        where: {
          userId_bookId: {
            userId: user.id,
            bookId: book.id,
          },
        },
        update: {},
        create: {
          rating: review.rating,
          comment: review.comment,
          userId: user.id,
          bookId: book.id,
        },
      });
    }
  }

  console.log('✅ Reviews seeded');
  console.log('🌱 Seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
