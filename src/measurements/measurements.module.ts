import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './domain/entities/measurement.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  controllers: [],
  providers: [],
})
export class MeasurementsModule {}
