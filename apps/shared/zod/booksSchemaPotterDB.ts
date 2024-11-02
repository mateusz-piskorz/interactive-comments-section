import { z } from 'zod';

const bookSchemaBase = z.object({
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
});

export const bookSchema = z.object({
  data: bookSchemaBase,
});
export const booksSchema = z.object({
  data: z.array(bookSchemaBase),
});

export type BookSchema = z.infer<typeof bookSchema>;
export type BooksSchema = z.infer<typeof booksSchema>;
