import { contractInstance } from './initContract';
import { authContract } from './routes/auth';
import { usersContract } from './routes/users';
import { commentsContract } from './routes/books/comments';
import { z } from 'zod';
import { booksContract } from './routes/books';

export const contract = contractInstance.router(
  {
    auth: authContract,
    users: usersContract,
    books: booksContract,
  },
  {
    commonResponses: {
      500: z.object({
        message: z.literal('Internal server error'),
      }),
    },
  }
);
