import { z } from 'zod';
import { Avatar, Color } from '@prisma/client';

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' }),
  avatar: z.nativeEnum(Avatar, { message: 'Please select an avatar' }),
  color: z.nativeEnum(Color, { message: 'Please select a color' }),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
