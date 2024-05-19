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

    const likesArr = [...comment.likes];
    let index = likesArr.indexOf(authorId);
    if (index === -1) {
      likesArr.push(authorId);
    } else {
      likesArr.splice(index, 1);
    }

    const likesCount = likesArr.length - comment.dislikes.length;

    return await comments.update({
      where: { id },
      data: { likes: likesArr, likesCount },
      select: selectCommentFields,
    });
  }
}
