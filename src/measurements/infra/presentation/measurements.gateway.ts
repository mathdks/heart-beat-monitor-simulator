import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMeasurementUseCase } from 'src/measurements/application/use-cases/createMeasurement.use-case';
import { CreateMeasurementDTO } from './dto/createMeasurement.dto';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway()
export class MeasurementsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => CreateMeasurementUseCase))
    private readonly createMeasurementUseCase: CreateMeasurementUseCase,
  ) {}

  @SubscribeMessage('createMeasurement')
  async createMeasurement(
    @MessageBody() data: CreateMeasurementDTO,
  ): Promise<void> {
    await this.createMeasurementUseCase.execute(data);
  }

  emitBip(): void {
    this.server.emit('alert', 'bip');
  }

  emitBipBip(): void {
    this.server.emit('alert', 'bipbip');
  }
}
