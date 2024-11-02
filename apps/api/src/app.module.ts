import { Module } from '@nestjs/common';
import { DatabaseModule } from './utils/database/database.module';
import { UsersModule } from './modules/users/users.module';
// import { CommentsModule } from './modules/Comments/comments.module';
import { CommentsModule } from './modules/books/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';
import { SocketModule } from './utils/socket/socket.module';
// import { BooksModule } from './modules/potterDB/Books/books.module';
import { BooksModule } from './modules/books/books.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    SocketModule,
    UsersModule,
    CommentsModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
