import { contractInstance } from '../initContract';
import { z } from 'zod';
import { Avatar, Color } from '@prisma/client';
import { UserSchema } from '../../../api/prisma/generated/zod';
import { unauthorized, usernameTaken } from '../constants';

const createUserSchemaDto = z.object({
  username: z.string().min(3),
  color: z.nativeEnum(Color),
  avatar: z.nativeEnum(Avatar),
});

const getUserSchema = z.object({
  avatar: z.nativeEnum(Avatar),
  color: z.nativeEnum(Color),
  username: z.string().min(3),
  id: z.string().min(10),
});

export const usersContract = contractInstance.router({
  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      ...unauthorized,
      200: z.array(getUserSchema),
    },
  },

  createNewUser: {
    method: 'POST',
    path: '/users',
    responses: {
      ...usernameTaken,
      201: UserSchema,
    },
    body: createUserSchemaDto,
  },
});
