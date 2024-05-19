import { Injectable, Req } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

import { selectCommentFields } from './constants';

const { comments } = new PrismaClient();

@Injectable()
export class CommentsService {
  async create(createCommentDto: CreateCommentDto, @Req() request: Request) {
    const { content, parentId } = createCommentDto;
    const authorId = request['user'].sub;
    const newComment = await comments.create({
      data: { content, authorId, parentId },
    });
    return newComment;
  }

  async findAll() {
    return await comments.findMany({
      select: selectCommentFields,
    });
  }

  // async findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    // await const updatedComments = comments
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
