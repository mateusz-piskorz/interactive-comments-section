import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BooksSchema } from 'apps/shared/zod/booksSchemaPotterDB';

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  async getAllBooks() {
    const books = await this.httpService.axiosRef.get<BooksSchema>(
      'https://api.potterdb.com/v1/books'
    );

    return books;
  }
}
