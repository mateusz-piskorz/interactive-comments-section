/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Controller, Param, UseGuards, Session } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../../../utils/auth.guard';
import { ThrottlerGuard } from '../../../utils/throttler.guard';
import { SessionType, SessionTypeU } from '../../../constants/session';
import { TsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';

const {
  getComments,
  createNewComment,
  editComment,
  likeComment,
  dislikeComment,
  removeComment,
} = contract.books.comments;

type Params = {
  bookSlug: string;
  id: string;
};

// /books/:bookSlug/comments
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard, ThrottlerGuard('create-comment', createNewComment))
  @TsRestHandler(createNewComment) //POST /books/:bookSlug/comments
  async create(
    @Param('bookSlug') bookSlug: string,
    @Session() session: SessionType
  ) {
    return this.commentsService.createNewComment(bookSlug, session.user!.id);
  }

  //GET /books/:bookSlug/comments
  // @UseGuards(AuthGuard)
  @TsRestHandler(getComments)
  async getComments(@Param('bookSlug') bookSlug: string) {
    return this.commentsService.getComments(bookSlug);
  }

  //POST /books/:bookSlug/comments/like/:id
  @UseGuards(AuthGuard, ThrottlerGuard('like-comment', likeComment))
  @TsRestHandler(likeComment)
  likeComment(@Param() p: Params, @Session() session: SessionTypeU) {
    return this.commentsService.likeComment(p.bookSlug, p.id, session.user.id);
  }

  //POST /books/:bookSlug/comments/dislike/:id
  @UseGuards(AuthGuard, ThrottlerGuard('like-comment', dislikeComment))
  @TsRestHandler(dislikeComment)
  dislikeComment(@Param() p: Params, @Session() session: SessionTypeU) {
    return this.commentsService.dislikeComment(
      p.bookSlug,
      p.id,
      session.user.id
    );
  }

  //PATCH /books/:bookSlug/comments/:id
  @UseGuards(AuthGuard, ThrottlerGuard('update-comment', editComment))
  @TsRestHandler(editComment)
  editComment(@Param() p: Params, @Session() session: SessionTypeU) {
    return this.commentsService.editComment(p.bookSlug, p.id, session.user.id);
  }

  //DELETE /books/:bookSlug/comments/:id
  @UseGuards(AuthGuard, ThrottlerGuard('remove-comment', removeComment))
  @TsRestHandler(removeComment)
  removeComment(@Param() p: Params, @Session() session: SessionTypeU) {
    return this.commentsService.removeComment(
      p.bookSlug,
      p.id,
      session.user.id
    );
  }
}
