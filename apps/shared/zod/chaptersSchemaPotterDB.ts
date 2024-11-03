import { z } from 'zod';

export const chaptersSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      type: z.literal('chapter'),
      attributes: z.object({
        slug: z.string(),
        order: z.number(),
        summary: z.string(),
        title: z.string(),
      }),
      relationships: z.object({
        book: z.object({
          data: z.object({
            id: z.string(),
            type: z.literal('book'),
          }),
        }),
      }),
    })
  ),
});

export type Chapters = z.infer<typeof chaptersSchema>;
