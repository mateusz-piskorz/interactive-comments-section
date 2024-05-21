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

    return await comments.update({
      where: { id },
      data: {
        likes: likesArr,
        dislikes: dislikesArr,
        likesCount: likesArr.length - dislikesArr.length,
      },
      select: selectCommentFields,
    });
  }

  async dislike(id: string, authorId: string) {
    const comment = await comments.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.authorId !== authorId) throw new UnauthorizedException();

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

    return await comments.update({
      where: { id },
      data: {
        likes: likesArr,
        dislikes: dislikesArr,
        likesCount: likesArr.length - dislikesArr.length,
      },
      select: selectCommentFields,
    });
  }

  async deleteAll() {
    return await comments.deleteMany();
  }
}
