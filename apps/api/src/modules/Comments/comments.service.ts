import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SocketGateway } from '../../utils/socket/socket.gateway';
import { DatabaseService } from '../../utils/database/database.service';
import { contract } from 'apps/shared/contract';
import { TsRestException, tsRestHandler } from '@ts-rest/nest';

const {
  getComments,
  createNewComment,
  editComment,
  likeComment,
  dislikeComment,
  removeComment,
} = contract.comments;

@Injectable()
export class CommentsService {
  constructor(
    private readonly socketGateway: SocketGateway,
    private prisma: DatabaseService
  ) {}

  getComments() {
    return tsRestHandler(getComments, async () => {
      const comments = await this.prisma.comment.findMany({
        include: {
          author: {
            select: { avatar: true, color: true, username: true, id: true },
          },
        },
      });
      return { status: 200, body: comments };
    });
  }

  createNewComment(authorId: string) {
    return tsRestHandler(createNewComment, async ({ body }) => {
      const { content, parentId } = body;

      if (content.length > 4000) {
        throw new TsRestException(createNewComment, {
          status: 413,
          body: { message: 'maximum length of content is 4000' },
        });
      }

      const newComment = await this.prisma.comment.create({
        data: { content, authorId, parentId },
        include: {
          author: {
            select: { avatar: true, color: true, username: true, id: true },
          },
        },
      });

      await this.socketGateway.server.emit('comment-added', newComment);
      return { status: 201, body: newComment };
    });
  }

  editComment(commentId: string, authorId: string) {
    return tsRestHandler(editComment, async ({ body: { content } }) => {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        throw new TsRestException(editComment, {
          status: 404,
          body: { message: 'resource not found' },
        });
      }

      if (comment.authorId !== authorId) {
        throw new TsRestException(editComment, {
          status: 401,
          body: { message: 'Unauthorized' },
        });
      }

      if (content.length > 4000) {
        throw new TsRestException(editComment, {
          status: 413,
          body: { message: 'maximum length of content is 4000' },
        });
      }

      const newComment = await this.prisma.comment.update({
        where: { id: commentId },
        data: { content },
        include: {
          author: {
            select: { avatar: true, color: true, username: true, id: true },
          },
        },
      });

      await this.socketGateway.server.emit('comment-edited', newComment);
      return { status: 201, body: newComment };
    });
  }

  likeComment(commentId: string, authorId: string) {
    return tsRestHandler(likeComment, async () => {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        throw new TsRestException(likeComment, {
          status: 404,
          body: { message: 'resource not found' },
        });
      }

      let likesArr = [...comment.likes];
      let dislikesArr = [...comment.dislikes];
      const hasLiked = likesArr.includes(authorId);
      const hasDisliked = dislikesArr.includes(authorId);

      if (!hasLiked && !hasDisliked) {
        likesArr.push(authorId);
      } else if (hasLiked) {
        likesArr = likesArr.filter((id) => id !== authorId);
      } else {
        dislikesArr = dislikesArr.filter((id) => id !== authorId);
        likesArr.push(authorId);
      }

      const newComment = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          likes: likesArr,
          dislikes: dislikesArr,
          likesCount: likesArr.length - dislikesArr.length,
        },
        include: {
          author: {
            select: { avatar: true, color: true, username: true, id: true },
          },
        },
      });
      await this.socketGateway.server.emit('comment-edited', newComment);

      return { status: 201, body: newComment };
    });
  }

  dislikeComment(commentId: string, authorId: string) {
    return tsRestHandler(dislikeComment, async () => {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        throw new TsRestException(dislikeComment, {
          status: 404,
          body: { message: 'resource not found' },
        });
      }

      let likesArr = [...comment.likes];
      let dislikesArr = [...comment.dislikes];
      const hasLiked = likesArr.includes(authorId);
      const hasDisliked = dislikesArr.includes(authorId);

      if (!hasLiked && !hasDisliked) {
        dislikesArr.push(authorId);
      } else if (hasDisliked) {
        dislikesArr = dislikesArr.filter((id) => id !== authorId);
      } else {
        likesArr = likesArr.filter((id) => id !== authorId);
        dislikesArr.push(authorId);
      }

      const newComment = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          likes: likesArr,
          dislikes: dislikesArr,
          likesCount: likesArr.length - dislikesArr.length,
        },
        include: {
          author: {
            select: { avatar: true, color: true, username: true, id: true },
          },
        },
      });
      await this.socketGateway.server.emit('comment-edited', newComment);

      return { status: 201, body: newComment };
    });
  }

  removeComment(commentId: string, authorId: string) {
    return tsRestHandler(removeComment, async () => {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        throw new TsRestException(removeComment, {
          status: 404,
          body: { message: 'resource not found' },
        });
      }

      if (comment.authorId !== authorId) throw new UnauthorizedException();

      const commentRemoved = await this.prisma.comment.delete({
        where: { id: commentId },
        include: {
          author: {
            select: { avatar: true, color: true, username: true, id: true },
          },
        },
      });

      await this.socketGateway.server.emit('comment-removed', commentId);
      return { status: 200, body: commentRemoved };
    });
  }
}
