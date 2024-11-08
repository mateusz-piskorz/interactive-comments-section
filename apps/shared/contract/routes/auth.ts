import { contractInstance } from '../initContract';
import { UserSchema } from '../../../api/prisma/generated/zod';
import { z } from 'zod';
import { unauthorized } from '../constants';

const singInDto = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export const authContract = contractInstance.router({
  getAuth: {
    method: 'GET',
    path: '/auth',
    responses: {
      ...unauthorized,
      200: UserSchema.pick({
        id: true,
        username: true,
        color: true,
        avatar: true,
      }),
    },
  },

  singIn: {
    method: 'POST',
    path: '/auth/singIn',
    responses: {
      ...unauthorized,
      201: UserSchema,
    },
    body: singInDto,
  },

  singOut: {
    method: 'POST',
    path: '/auth/singOut',
    responses: {
      201: z.object({ message: z.literal('Successfully logged out') }),
    },
    body: z.object({}),
  },
});
