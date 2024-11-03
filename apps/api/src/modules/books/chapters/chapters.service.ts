import { Inject, Injectable } from '@nestjs/common';
import { contract } from 'apps/shared/contract';
import { tsRestHandler, TsRestException } from '@ts-rest/nest';
import { HttpService } from '@nestjs/axios';
import { Chapters } from 'apps/shared/zod/chaptersSchemaPotterDB';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const { getChapter, getAllChapters } = contract.books.chapters;

@Injectable()
export class ChaptersService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  getAllChapters(bookSlug: string) {
    return tsRestHandler(getAllChapters, async () => {
      try {
        const path = `https://api.potterdb.com/v1/books/${bookSlug}/chapters`;
        const key = path;
        const redisValue = await this.cacheManager.get<Chapters>(key);
        if (!redisValue) {
          const chapters = await this.httpService.axiosRef.get<Chapters>(path);

          await this.cacheManager.set(key, chapters.data);
          return { status: 200, body: chapters.data };
        } else {
          return { status: 200, body: redisValue };
        }
      } catch (err: any) {
        if (err.status === 404) {
          throw new TsRestException(getChapter, {
            status: 404,
            body: { message: 'resource not found' },
          });
        } else {
          throw new TsRestException(getChapter, {
            status: 500,
            body: { message: 'Internal server error' },
          });
        }
      }
    });
  }

  getChapter(bookSlug: string, chapterNumber: number) {
    return tsRestHandler(getChapter, async () => {
      try {
        const chapter = await this.httpService.axiosRef.get<string>(
          `http://localhost:3000/books/${bookSlug}/chapters/${chapterNumber}`
        );

        return { status: 200, body: { text: chapter.data } };
      } catch (err: any) {
        if (err.status === 404) {
          throw new TsRestException(getChapter, {
            status: 404,
            body: { message: 'resource not found' },
          });
        } else {
          throw new TsRestException(getChapter, {
            status: 500,
            body: { message: 'Internal server error' },
          });
        }
      }
    });
  }
}
