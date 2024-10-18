import { Injectable } from '@nestjs/common';
import { contract } from 'apps/shared/contract';
import { tsRestHandler } from '@ts-rest/nest';
import { HttpService } from '@nestjs/axios';

const { getBooks } = contract.poterDB.books;

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  getBooks() {
    return tsRestHandler(getBooks, async () => {
      const books = await this.httpService.axiosRef.get(
        'https://api.potterdb.com/v1/books'
      );

      return { status: 200, body: books.data };
    });
  }
}
