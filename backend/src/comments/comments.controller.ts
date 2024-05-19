import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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
  @Post()
  create(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @Req() request: Request,
  ) {
    const authorId: string = request['user'].sub;
    return this.commentsService.create(createCommentDto, authorId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() request: Request,
  ) {
    const authorId: string = request['user'].sub;
    return this.commentsService.update(id, updateCommentDto, authorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
