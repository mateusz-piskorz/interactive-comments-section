import { Module } from '@nestjs/common';
import { DatabaseModule } from './utils/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/books/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';
import { SocketModule } from './utils/socket/socket.module';
import { BooksModule } from './modules/books/books.module';
import { ChaptersModule } from './modules/books/chapters/chapters.module';

@Module({
  imports: [
    DatabaseModule,
    SocketModule,
    UsersModule,
    CommentsModule,
    AuthModule,
    BooksModule,
    ChaptersModule,
  ],
})
export class AppModule {}
