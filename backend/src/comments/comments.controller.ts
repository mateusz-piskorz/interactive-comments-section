import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/users/auth.guard';
import { ThrottlerGuard } from './throttler.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard, ThrottlerGuard('create-comments'))
  @Post() //POST /comments
  create(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @Request() request: Request,
  ) {
    const authorId: string = request['user'].id;
    return this.commentsService.create(createCommentDto, authorId);
  }

  @UseGuards(AuthGuard)
  @Get() //GET /comments
  findAll() {
    return this.commentsService.findAll();
  }

  @UseGuards(AuthGuard, ThrottlerGuard('like-comment'))
  @Post('/like/:id') //POST /comments/like/:id
  like(@Param('id') id: string, @Request() request: Request) {
    const authorId: string = request['user'].id;
    return this.commentsService.like(id, authorId);
  }

  @UseGuards(AuthGuard, ThrottlerGuard('like-comment'))
  @Post('/dislike/:id') //POST /comments/dislike/:id
  dislike(@Param('id') id: string, @Request() request: Request) {
    const authorId: string = request['user'].id;
    return this.commentsService.dislike(id, authorId);
  }

  @UseGuards(AuthGuard, ThrottlerGuard('update-comments'))
  @Patch(':id') //PATCH /comments/:id
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() request: Request,
  ) {
    const authorId: string = request['user'].id;
    return this.commentsService.update(id, updateCommentDto, authorId);
  }

  @Delete('deleteAll') //DELETE /comments/:id
  deleteAll() {
    return this.commentsService.deleteAll();
  }

  @UseGuards(AuthGuard)
  @Delete(':id') //DELETE /comments/:id
  remove(@Param('id') id: string, @Request() request: Request) {
    const authorId: string = request['user'].id;
    return this.commentsService.remove(id, authorId);
  }
}
