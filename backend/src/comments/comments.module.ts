import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, SocketGateway],
  exports: [CommentsService],
})
export class CommentsModule {}
