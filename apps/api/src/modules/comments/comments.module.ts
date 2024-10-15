import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from '../../utils/database/database.module';
import { SocketGateway } from '../../utils/socket/socket.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, SocketGateway],
})
export class CommentsModule {}
