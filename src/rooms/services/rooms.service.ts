import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { CreateRoomDto } from '../dto/create.room.dto';
import { SearchRoomDto } from '../dto/search.room.dto';
import { UpdateRoomDto } from '../dto/update.room.dto';
import { RoomEntity } from '../models/rooms.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private readonly roomsRepository: Repository<RoomEntity>,
    private readonly usersService: UsersService,
  ) {}

  async findRoomById(id: number): Promise<any> {
    const result = await this.roomsRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException('존재하지 않는 방입니다.', 401);
    }
    return result;
  }

  // 방 만들기
  async createRoom(body: CreateRoomDto, master: string): Promise<any> {
    const room = new RoomEntity();
    const { title, password, hintTime, reasoningTime, isRandom } = body;
    const user = await this.usersService.findUserByNickname(master);
    room.title = title;
    room.password = password;
    room.count = 1;
    room.hintTime = hintTime;
    room.reasoningTime = reasoningTime;
    room.isRandom = isRandom;
    room.master = master;
    room.roomUniqueId = uuidv4().toString();
    room.userId = user.id;

    const newRoom = await this.roomsRepository.save(room);
    const result = { ...newRoom };
    return {
      result: { success: true, ...result },
    };
  }

  // 방 수정하기
  async updateRoom(id: number, body: UpdateRoomDto) {
    const existRoom = await this.findRoomById(id);

    const result = await this.roomsRepository.update(id, body);
    return { result: { success: true, ...result } };
  }

  // 방 삭제하기
  async deleteRoom(id: number) {
    const existRoom = await this.findRoomById(id);

    await this.roomsRepository.delete(id);

    return { result: { success: true } };
  }

  // 방 목록
  async getAllRoom() {
    const roomList = await this.roomsRepository.find();
    return { result: { roomList } };
  }

  // 방 찾기
  async searchRoom(query: SearchRoomDto) {
    const { type, inputValue } = query;
    console.log("확인", type, inputValue);
    
    let roomList;
    if (type == 'TITLE') {
      roomList = await this.roomsRepository
        .createQueryBuilder('Room')
        .where('Room.title LIKE :title', { title: `%${inputValue}%` })
        .getMany();
      console.log(roomList);
    } else if(type == 'NICKNAME') {
      roomList = await this.roomsRepository
        .createQueryBuilder('Room')
        .where('Room.master LIKE :master', { master: `%${inputValue}%` })
        .getMany();
    } else if(type == 'STATE') {
      roomList = await this.roomsRepository
        .createQueryBuilder('Room')
        .where('Room.roomState LIKE :roomState', { roomState: `%${inputValue}%` })
        .getMany();
    }
    return { result: { success: true, roomList } };
  }

  // 방 비밀번호 체크
  async chkPassordRoom(roomId: number, password: string) {
    const room = await this.findRoomById(roomId);
    if ( room.password !== password) {
      return { result: { success: false}};
    } else return { result: { success: true }};
  }
}
