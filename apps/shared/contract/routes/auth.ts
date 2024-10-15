import { contractInstance } from '../initContract';
import { UserSchema } from '../../../api/prisma/generated/zod';
import { string, z } from 'zod';
import { unauthorized } from '../constants';

const singInDto = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export const authContract = contractInstance.router({
  getAuth: {
    method: 'POST',
    path: '/auth',
    responses: {
      ...unauthorized,
      201: UserSchema,
    },
    body: z.object({}),
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
});
