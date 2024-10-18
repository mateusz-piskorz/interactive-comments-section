import { Module } from '@nestjs/common';
import { DatabaseModule } from './utils/database/database.module';
import { UsersModule } from './modules/Users/users.module';
import { CommentsModule } from './modules/Comments/comments.module';
import { AuthModule } from './modules/Auth/auth.module';
import { SocketModule } from './utils/socket/socket.module';
import { BooksModule } from './modules/potterDB/Books/books.module';

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
