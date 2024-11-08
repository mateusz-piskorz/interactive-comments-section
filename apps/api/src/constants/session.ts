import { User } from '@prisma/client';
import { Session } from 'express-session';

export const SESSION_EXPIRATION = 900000; // 15min

export type SessionType<UserGuarantee extends boolean = false> = Session & {
  user: UserGuarantee extends true ? User : User | undefined;
};
