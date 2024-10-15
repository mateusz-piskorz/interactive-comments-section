import { contractInstance } from './initContract';
import { authContract } from './routes/auth';
import { usersContract } from './routes/users';
import { commentsContract } from './routes/comments';
import { z } from 'zod';

export const contract = contractInstance.router(
  {
    auth: authContract,
    users: usersContract,
    comments: commentsContract,
  },
  {
    commonResponses: {
      500: z.object({
        message: z.literal('Internal server error'),
      }),
    },
  }
);
