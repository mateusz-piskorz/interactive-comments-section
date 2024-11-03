/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Controller, Param, UseGuards } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { AuthGuard } from '../../../utils/auth.guard';
import { TsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';

const { getChapter } = contract.books.chapters;

type Params = {
  bookSlug: string;
  chapterNumber: number;
};

// /books/:bookSlug/comments
@Controller()
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  //POST /books/:bookSlug/chapters/:chapterNumber
  @UseGuards(AuthGuard)
  @TsRestHandler(getChapter)
  getChapter(@Param() p: Params) {
    return this.chaptersService.getChapters(p.bookSlug, p.chapterNumber);
  }
}
