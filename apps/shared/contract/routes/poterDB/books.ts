import { contractInstance } from '../../initContract';
import { z } from 'zod';
import { unauthorized } from '../../constants';

const booksSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.string(),
    attributes: z.object({
      slug: z.string(),
      author: z.string(),
      cover: z.string(),
      dedication: z.string(),
      pages: z.number(),
      release_date: z.string(),
      summary: z.string(),
      title: z.string(),
      wiki: z.string(),
    }),
    relationships: z.object({
      chapters: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            type: z.string(),
          })
        ),
      }),
    }),
    links: z.object({
      self: z.string(),
    }),
  }),
});

export const booksContract = contractInstance.router({
  getBooks: {
    method: 'GET',
    path: '/books',
    responses: {
      ...unauthorized,
      200: booksSchema,
    },
  },
});
