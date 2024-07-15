import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './domain/entities/measurement.entity';
import { MeasurementsController } from './infra/presentation/measurements.controller';
import { MeasurementsGateway } from './infra/presentation/measurements.gateway';
@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  controllers: [MeasurementsController],
  providers: [MeasurementsGateway],
})
export class MeasurementsModule {}
