import { contractInstance } from '../../../initContract';
import { z } from 'zod';
import { unauthorized, notFound } from '../../../constants';

export const chaptersContract = contractInstance.router(
  {
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
