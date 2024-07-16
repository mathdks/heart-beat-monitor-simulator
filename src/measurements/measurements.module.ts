import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './domain/entities/measurement.entity';
import { MeasurementsController } from './infra/presentation/measurements.controller';
import { MeasurementsGateway } from './infra/presentation/measurements.gateway';
import { CreateMeasurementUseCase } from './application/use-cases/createMeasurement.use-case';
import { MeasurementRepository } from './domain/repository/measurements.repository';
import { MeasurementAdapter } from './infra/adapters/measurement.adapter';
import { IrregularitiesModule } from 'src/irregularities/irregularities.module';
import { CountIrregularitiesOnLast60Measurements } from './application/use-cases/countIrregularitiesOnLast60Measurements.use-case';
import { FindAllMeasurementsUseCase } from './application/use-cases/findAllMeasurements.use-case';
@Module({
  imports: [TypeOrmModule.forFeature([Measurement]), IrregularitiesModule],
  controllers: [MeasurementsController],
  providers: [
    MeasurementsGateway,
    CreateMeasurementUseCase,
    CountIrregularitiesOnLast60Measurements,
    FindAllMeasurementsUseCase,
    {
      provide: MeasurementRepository,
      useClass: MeasurementAdapter,
    }
  ],
})
export class MeasurementsModule {}
