import { Module } from '@nestjs/common';
import { DatabaseModule } from './utils/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';
import { SocketModule } from './utils/socket/socket.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    SocketModule,
    UsersModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
