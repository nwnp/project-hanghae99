import { CurrentUserEntity } from 'src/current/current.users.entity';
import { RoomEntity } from 'src/rooms/models/rooms.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  social: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => RoomEntity, (rooms) => rooms.user)
  rooms: RoomEntity;

  @OneToMany(() => CurrentUserEntity, (currentusers) => currentusers.user)
  users: CurrentUserEntity;
}
