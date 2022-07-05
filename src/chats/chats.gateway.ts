import { ChatService } from './chats.gateway.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatDto } from './dto/chat.dto';
import { CreateRoomDto } from './dto/create.room.dto';
import { JoinRoomDto } from './dto/join.room.dto';
import { ExitRoomDto } from './dto/exit.room.dto';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  handleConnection(@ConnectedSocket() socket: Socket) {
    return this.chatService.connected(socket);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    return this.chatService.disconnected(socket);
  }

  @SubscribeMessage('submit_chat') handleSubmitChat(
    @MessageBody() chat: ChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.chats(chat, socket);
  }

  @SubscribeMessage('room_list')
  handleRoomList(@ConnectedSocket() socket: Socket) {
    return this.chatService.roomList(socket);
  }

  @SubscribeMessage('create_room')
  handleCreateRoom(@ConnectedSocket() socket: Socket, roomData: CreateRoomDto) {
    const master = roomData.userId;
    return this.chatService.create(socket, master, roomData);
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(@ConnectedSocket() socket: Socket, data: JoinRoomDto) {
    return this.chatService.join(socket, data);
  }

  @SubscribeMessage('exit_room')
  handlExitRoom(@ConnectedSocket() socket: Socket, data: ExitRoomDto) {
    return this.chatService.exit(socket, data);
  }
}
