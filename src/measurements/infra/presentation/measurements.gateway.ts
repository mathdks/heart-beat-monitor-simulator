// src/measurements/measurements.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MeasurementsGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage('sendMeasurement')
  async handleMessage(@MessageBody() data: { value: number }): Promise<void> {
    this.server.emit('alert', 'bip', data);
  }
}
