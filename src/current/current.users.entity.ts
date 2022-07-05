import { EpisodeEntity } from 'src/episode/episode.entity';
import { ImageEntity } from 'src/images/images.entity';
import { RoomEntity } from 'src/rooms/models/rooms.entity';
import { UserEntity } from 'src/users/models/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CurrentUser')
export class CurrentUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'userId', nullable: true })
  userId: number | null;

  @Column('int', { name: 'roomId', nullable: true })
  roomId: number | null;

  @ManyToOne(() => UserEntity, (user) => user.users)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.rooms)
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  room: RoomEntity;

  @OneToOne(() => EpisodeEntity)
  @JoinColumn()
  episode: EpisodeEntity;

  @OneToOne(() => ImageEntity)
  @JoinColumn([{ name: 'imagUrlId', referencedColumnName: 'id' }])
  imageUrl: ImageEntity;
}
