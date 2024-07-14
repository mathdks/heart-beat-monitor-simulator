import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './domain/entities/measurement.entity';
import { MeasurementsController } from './infra/presentation/measurements.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  controllers: [MeasurementsController],
  providers: [],
})
export class MeasurementsModule {}
