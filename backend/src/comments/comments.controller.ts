import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/users/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post() //POST /comments
  create(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @Req() request: Request,
  ) {
    const authorId: string = request['user'].sub;
    return this.commentsService.create(createCommentDto, authorId);
  }

  @UseGuards(AuthGuard)
  @Get() //GET /comments
  findAll() {
    return this.commentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch('/like/:id') //PATH /comments/like/:id
  like(@Param('id') id: string, @Req() request: Request) {
    const authorId: string = request['user'].sub;
    return this.commentsService.like(id, authorId);
  }

  @UseGuards(AuthGuard)
  @Patch('/dislike/:id') //PATH /comments/dislike/:id
  dislike(@Param('id') id: string, @Req() request: Request) {
    const authorId: string = request['user'].sub;
    return this.commentsService.dislike(id, authorId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id') //PATH /comments/:id
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() request: Request,
  ) {
    const authorId: string = request['user'].sub;
    return this.commentsService.update(id, updateCommentDto, authorId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id') //DELETE /comments/:id
  remove(@Param('id') id: string, @Req() request: Request) {
    const authorId: string = request['user'].sub;
    return this.commentsService.remove(id, authorId);
  }
}
