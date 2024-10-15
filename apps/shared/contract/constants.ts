import { z } from 'zod';

export const unauthorized = {
  401: z.object({
    message: z.literal('Unauthorized'),
  }),
};

export const notFound = {
  404: z.object({
    message: z.literal(`resource not found`),
  }),
};

export const actionThrottler = {
  403: z.object({
    message: z.string(),
    remainingTime: z.number(),
  }),
};

export const characterLimit = {
  413: z.object({
    message: z.literal('maximum length of content is 4000'),
  }),
};

export const usernameTaken = {
  409: z.object({ message: z.literal('username already taken') }),
};
