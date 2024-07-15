import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from 'src/measurements/domain/repository/measurements.repository';

@Injectable()
export class CountIrregularitiesOnLast60Measurements {
  constructor(private readonly measurementRepository: MeasurementRepository) {}

  async execute(): Promise<number> {
    return await this.measurementRepository.findLast60AndCount();
  }
}
