import { RoomsService } from './../../rooms/services/rooms.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CurrentUserEntity } from '../models/current.users.entity';

@Injectable()
export class CurrentUsersService {
  constructor(
    @Inject('CURRENT_REPOSITORY')
    private readonly currentUsersRepository: Repository<CurrentUserEntity>,
  ) {}

  async readyStateUpdate(userId: number, roomId: number) {
    const user = new CurrentUserEntity();
    const userReadyState = await this.currentUsersRepository.findOne({
      where: { userId },
    });
    if (userReadyState.readyState === true) {
      user.readyState = false;
      await this.currentUsersRepository.update({ id: userId }, user);
      const users = await this.currentUsersRepository.find({
        where: { roomId },
      });
      return users;
    } else {
      user.readyState = true;
      await this.currentUsersRepository.update({ id: userId }, user);
      const users = await this.currentUsersRepository.find({
        where: { roomId },
      });
      return users;
    }
  }

  async getLog(userId: number) {
    const users = await this.currentUsersRepository.find({
      relations: {
        user: true,
        room: true,
        episode: true,
      },
    });
    for (let i = 0; i < users.length; i++) {
      if (users[i].user.id !== userId) {
        delete users[i];
      }
      delete users[i].user.password;
    }
    return users;
  }

  async currentUser(roomId: number) {
    const users = await this.currentUsersRepository.find({
      relations: { room: true },
      where: { roomId: roomId },
    });
    return users;
  }

  async currentUsers(roomId: number) {
    const users = await this.currentUsersRepository.find({ where: { roomId } });
    return users;
  }

  async userJoinRoom(userId: number, roomId: number) {
    const newJoiner = new CurrentUserEntity();
    newJoiner.roomId = roomId;
    newJoiner.userId = userId;
    const result = await this.currentUsersRepository.save(newJoiner);
    return result;
  }

  async roleRegister(roomId: number, room: Array<number>) {
    const users = await this.currentUsers(roomId);
    let result = [];
    for (let i = 0; i < room.length; i++) {
      const payload = {
        userId: users[i].userId,
        roomId: users[i].roomId,
        episodeId: room[i],
        imageUrlId: room[i],
        readyState: true,
      };
      result.push(
        await this.currentUsersRepository.update(
          { userId: users[i].userId },
          payload,
        ),
      );
    }
    return result;
  }

  async hint(userId: number) {
    const updated = await this.currentUsersRepository.update(
      { userId },
      { hintReady: true },
    );
    return updated;
  }

  async exitRoom(userId: number) {
    const user = new CurrentUserEntity();
    // user.userId = userId;
    const result = this.currentUsersRepository.delete({ userId: userId });
    return result;
  }
}
