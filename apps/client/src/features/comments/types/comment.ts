import { tsr } from '@/global/utils/ts-client';

export type CommentWithAuthor = Extract<
  Awaited<ReturnType<typeof tsr.comments.getComments.query>>,
  { status: 200 }
>['body'][0];
