import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
})
export class SocketGateway {
  @WebSocketServer()
  // @ts-expect-error something
  server: Server;
}
