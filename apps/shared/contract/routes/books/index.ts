import { contractInstance } from '../../initContract';
import { unauthorized } from '../../constants';
import { booksSchema } from '../../../zod/booksSchemaPotterDB';
import { commentsContract } from './comments';
import { chaptersContract } from './chapters';

export const booksContract = contractInstance.router(
  {
    getBooks: {
      method: 'GET',
      path: '/',
      responses: {
        ...unauthorized,
        200: booksSchema,
      },
    },
    comments: commentsContract,
    chapters: chaptersContract,
  },
  {
    pathPrefix: '/books',
  }
);
