import { contractInstance } from '../../../initContract';
import { z } from 'zod';
import { unauthorized, notFound } from '../../../constants';
import { chaptersSchema } from '../../../../zod/chaptersSchemaPotterDB';

export const chaptersContract = contractInstance.router(
  {
    getAllChapters: {
      method: 'GET',
      path: '/',
      responses: {
        ...unauthorized,
        200: chaptersSchema,
      },
    },

    getChapter: {
      method: 'GET',
      path: '/:chapterNumber',
      responses: {
        ...unauthorized,
        ...notFound,
        200: z.object({ text: z.string() }),
      },
    },
  },
  {
    pathPrefix: '/:bookSlug/chapters',
  }
);
