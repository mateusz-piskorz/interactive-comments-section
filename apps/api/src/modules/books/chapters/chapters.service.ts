import { Injectable } from '@nestjs/common';
import { contract } from 'apps/shared/contract';
import { tsRestHandler, TsRestException } from '@ts-rest/nest';
import { HttpService } from '@nestjs/axios';

const { getChapter } = contract.books.chapters;

@Injectable()
export class ChaptersService {
  constructor(private readonly httpService: HttpService) {}

  getChapters(bookSlug: string, chapterNumber: number) {
    return tsRestHandler(getChapter, async () => {
      try {
        const books = await this.httpService.axiosRef.get<string>(
          `http://localhost:3000/books/${bookSlug}/chapters/${chapterNumber}`
        );

        return { status: 200, body: { text: books.data } };
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
