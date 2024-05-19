import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

import { selectCommentFields } from './constants';

const { comments } = new PrismaClient();

@Injectable()
export class CommentsService {
  async create(createCommentDto: CreateCommentDto, authorId: string) {
    const { content, parentId } = createCommentDto;
    return await comments.create({
      data: { content, authorId, parentId },
      select: selectCommentFields,
    });
  }

  async findAll() {
    return await comments.findMany({
      select: selectCommentFields,
    });
  }

  async update(id: string, { content }: UpdateCommentDto, authorId: string) {
    const comment = await comments.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.authorId !== authorId) throw new UnauthorizedException();

    return await comments.update({
      where: { id },
      data: { content },
      select: selectCommentFields,
    });
  }

  async remove(id: string, authorId: string) {
    const comment = await comments.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.authorId !== authorId) throw new UnauthorizedException();

    return await comments.delete({
      where: { id },
      select: selectCommentFields,
    });
  }

  async like(id: string, authorId: string) {
    const comment = await comments.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.authorId !== authorId) throw new UnauthorizedException();

    let likesArr = [...comment.likes];
    let dislikesArr = [...comment.dislikes];

    if (![...likesArr, ...dislikesArr].includes(authorId)) {
      //user has not liked this comment yet, so we adding a like
      likesArr.push(authorId);
    } else if (likesArr.includes(authorId)) {
      //user has liked this comment, so we removing a like
      likesArr = likesArr.filter((id) => id !== authorId);
    } else {
      //user has disliked this comment, so we removing dislike and adding a like
      dislikesArr = dislikesArr.filter((id) => id !== authorId);
      likesArr.push(authorId);
    }

    const likesCount = likesArr.length - dislikesArr.length;

    return await comments.update({
      where: { id },
      data: { likes: likesArr, dislikes: dislikesArr, likesCount },
      select: selectCommentFields,
    });
  }

  async dislike(id: string, authorId: string) {
    const comment = await comments.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.authorId !== authorId) throw new UnauthorizedException();

    let likesArr = [...comment.likes];
    let dislikesArr = [...comment.dislikes];

    if (![...likesArr, ...dislikesArr].includes(authorId)) {
      //user has not liked this comment yet, so we adding a like
      dislikesArr.push(authorId);
    } else if (dislikesArr.includes(authorId)) {
      //user has liked this comment, so we removing a like
      dislikesArr = dislikesArr.filter((id) => id !== authorId);
    } else {
      //user has liked this comment, so we removing like and adding a dislike
      likesArr = likesArr.filter((id) => id !== authorId);
      dislikesArr.push(authorId);
    }

    const likesCount = likesArr.length - dislikesArr.length;

    return await comments.update({
      where: { id },
      data: { likes: likesArr, dislikes: dislikesArr, likesCount },
      select: selectCommentFields,
    });
  }
}
