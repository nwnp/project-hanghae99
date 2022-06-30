import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../dto/create.room.dto';
import { RoomEntity } from '../models/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private readonly roomsRepository: Repository<RoomEntity>,
  ) {}

  // async findRoomById(id: number): Promise<Room> {
  //   try {
  //     const result = await this.roomsRepository.findOne({ where: { id } });

  //     if (!result) {
  //       throw new NotFoundException('존재하지 않는 방입니다.');
  //     }

  //     return result;
  //   } catch (error) {3
  //     throw new HttpException('서버 에러', 500);
  //   }
  // }

  // 방 만들기
  async createRoom(body: CreateRoomDto): Promise<any> {
    try {
      const room = new RoomEntity();
      const { title, password, hintTime, reasoningTime, isRandom } = body;
      const master = 'userId';

      room.title = title;
      room.password = password;
      room.count = 1;
      room.hintTime = hintTime;
      room.reasoningTime = reasoningTime;
      room.isRandom = isRandom;
      room.master = master;

      const newRoom = await this.roomsRepository.save(room);
      return {
        result: { success: true, master: newRoom.master, roomId: newRoom.id },
      };
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }

  

}
