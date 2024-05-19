import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

const { comments } = new PrismaClient();

@Injectable()
export class CommentsService {
  async create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  async findAll() {
    const myComments = await comments.findMany();
    return myComments;
  }

  async findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
