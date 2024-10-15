/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Controller, Param, UseGuards, Session } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../../utils/auth.guard';
import { ThrottlerGuard } from '../../utils/throttler.guard';
import { SessionType, SessionTypeU } from '../../constants/session';
import { TsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';

const {
  getComments,
  createNewComment,
  editComment,
  likeComment,
  dislikeComment,
  removeComment,
} = contract.comments;
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard, ThrottlerGuard('create-comment', createNewComment))
  @TsRestHandler(createNewComment) //POST /comments
  async create(@Session() session: SessionType) {
    return this.commentsService.createNewComment(session.user!.id);
  }

  //GET /comments
  @UseGuards(AuthGuard)
  @TsRestHandler(getComments)
  async getComments() {
    return this.commentsService.getComments();
  }

  //POST /comments/like/:id
  @UseGuards(AuthGuard, ThrottlerGuard('like-comment', likeComment))
  @TsRestHandler(likeComment)
  likeComment(@Param('id') id: string, @Session() session: SessionTypeU) {
    console.log('czesc2');
    return this.commentsService.likeComment(id, session.user.id);
  }

  //POST /comments/dislike/:id
  @UseGuards(AuthGuard, ThrottlerGuard('like-comment', dislikeComment))
  @TsRestHandler(dislikeComment)
  dislikeComment(@Param('id') id: string, @Session() session: SessionTypeU) {
    return this.commentsService.dislikeComment(id, session.user.id);
  }

  //PATCH /comments/:id
  @UseGuards(AuthGuard, ThrottlerGuard('update-comment', editComment))
  @TsRestHandler(editComment)
  editComment(@Param('id') id: string, @Session() session: SessionTypeU) {
    return this.commentsService.editComment(id, session.user.id);
  }

  //DELETE /comments/:id
  @UseGuards(AuthGuard, ThrottlerGuard('remove-comment', removeComment))
  @TsRestHandler(removeComment)
  removeComment(@Param('id') id: string, @Session() session: SessionTypeU) {
    return this.commentsService.removeComment(id, session.user.id);
  }
}
