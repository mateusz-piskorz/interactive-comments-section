import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BooksSchema } from 'apps/shared/zod/booksSchemaPotterDB';
import { tsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const { getAllBooks } = contract.books;
@Injectable()
export class BooksService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  getAllBooks() {
    return tsRestHandler(getAllBooks, async () => {
      const key = 'hp-books';
      const redisValue = await this.cacheManager.get<BooksSchema>(key);

      if (!redisValue) {
        const books = await this.httpService.axiosRef.get<BooksSchema>(
          'https://api.potterdb.com/v1/books'
        );

        await this.cacheManager.set(key, books.data);
        return { status: 200, body: books.data };
      } else {
        return { status: 200, body: redisValue };
      }
    });
  }
}
