import { contractInstance } from '../initContract';
import { z } from 'zod';
import { Avatar, Color } from '@prisma/client';
import { UserSchema } from '../../../api/prisma/generated/zod';
import { unauthorized, usernameTaken, notFound } from '../constants';

const createUserSchemaDto = z.object({
  username: z.string().min(3),
  color: z.nativeEnum(Color),
  avatar: z.nativeEnum(Avatar),
});

const rUser = UserSchema.pick({ username: true, color: true, avatar: true });

export const usersContract = contractInstance.router({
  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      ...unauthorized,
      200: z.array(rUser),
    },
  },

  getUser: {
    method: 'GET',
    path: '/users/:username',
    responses: {
      ...unauthorized,
      ...notFound,
      200: rUser,
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
