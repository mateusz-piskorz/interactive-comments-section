import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../utils/database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
