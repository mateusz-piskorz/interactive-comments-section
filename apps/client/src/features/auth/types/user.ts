import { tsr } from '@/global/utils/ts-client';

export type rUser = Extract<
  Awaited<ReturnType<typeof tsr.auth.getAuth.query>>,
  { status: 200 }
>['body'];
