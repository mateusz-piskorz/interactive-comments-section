import { User } from '@prisma/client';

export const SESSION_EXPIRATION = 900000; // 15min

export type SessionType = Record<'user', User | undefined>;
export type SessionTypeU = Record<'user', User>;
