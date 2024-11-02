import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../utils/database/database.service';
import { HttpService } from '@nestjs/axios';
import { BooksSchema } from 'apps/shared/zod/booksSchemaPotterDB';
// import { TsRestException, tsRestHandler } from '@ts-rest/nest';
// import { contract } from 'apps/shared/contract';
// import { User } from '@prisma/client';

// const { createNewUser, getUsers } = contract.users;

@Injectable()
export class BooksService {
  constructor(
    private prisma: DatabaseService,
    private readonly httpService: HttpService
  ) {}

  async getAllBooks() {
    const books = await this.httpService.axiosRef.get<BooksSchema>(
      'https://api.potterdb.com/v1/books'
    );

    return books;
  }
}
