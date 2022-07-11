import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { RoomsController } from './controllers/rooms.controller';
import { roomProviders } from './models/rooms.provider';
import { RoomsService } from './services/rooms.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [RoomsService, ...roomProviders],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
