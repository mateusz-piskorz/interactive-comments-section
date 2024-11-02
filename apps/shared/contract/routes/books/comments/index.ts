import { contractInstance } from '../../../initContract';
import { z } from 'zod';
import { Avatar, Color } from '@prisma/client';
import { CommentSchema } from '../../../../../api/prisma/generated/zod';
import {
  actionThrottler,
  unauthorized,
  notFound,
  characterLimit,
} from '../../../constants';

const createCommentSchemaDto = z.object({
  content: z.string().min(2),
  parentId: z.string().optional(),
});

const authorSchema = z.object({
  avatar: z.nativeEnum(Avatar),
  color: z.nativeEnum(Color),
  username: z.string(),
  id: z.string(),
});

export const commentsContract = contractInstance.router(
  {
    getComments: {
      method: 'GET',
      path: '/',
      responses: {
        ...unauthorized,
        200: z.array(CommentSchema.merge(z.object({ author: authorSchema }))),
      },
    },

    createNewComment: {
      method: 'POST',
      path: '/',
      responses: {
        ...unauthorized,
        ...notFound,
        ...actionThrottler,
        ...characterLimit,
        201: CommentSchema.merge(z.object({ author: authorSchema })),
      },
      body: createCommentSchemaDto,
    },

    editComment: {
      method: 'PATCH',
      path: '/:id',
      responses: {
        ...unauthorized,
        ...notFound,
        ...actionThrottler,
        ...characterLimit,
        201: CommentSchema.merge(z.object({ author: authorSchema })),
      },
      body: z.object({ content: z.string().min(2) }),
    },

    likeComment: {
      method: 'POST',
      path: '/like/:id',
      responses: {
        ...unauthorized,
        ...notFound,
        ...actionThrottler,
        201: CommentSchema.merge(z.object({ author: authorSchema })),
      },
      body: z.object({}),
    },

    dislikeComment: {
      method: 'POST',
      path: '/dislike/:id',
      responses: {
        ...unauthorized,
        ...notFound,
        ...actionThrottler,
        201: CommentSchema.merge(z.object({ author: authorSchema })),
      },
      body: z.object({}),
    },

    removeComment: {
      method: 'DELETE',
      path: '/:id',
      responses: {
        ...unauthorized,
        ...notFound,
        ...actionThrottler,
        200: CommentSchema.merge(z.object({ author: authorSchema })),
      },
      body: z.object({}),
    },
  },
  {
    pathPrefix: '/:bookSlug/comments',
  }
);
