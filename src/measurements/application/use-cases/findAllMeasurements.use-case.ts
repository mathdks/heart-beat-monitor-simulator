import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from 'src/measurements/domain/repository/measurements.repository';

@Injectable()
export class FindAllMeasurementsUseCase {
  constructor(private readonly measurementRepository: MeasurementRepository) {}

  async execute() {
    return this.measurementRepository.findAll();
  }
}
