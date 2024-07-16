import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from 'src/measurements/domain/entities/measurement.entity';
import { MeasurementRepository } from 'src/measurements/domain/repository/measurements.repository';
import { MoreThan, Repository } from 'typeorm';

export class MeasurementAdapter implements MeasurementRepository {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
  ) {}

  save(measurement: Measurement): Promise<Measurement> {
    return this.measurementRepository.save(measurement);
  }

  findAll(): Promise<Measurement[]> {
    return this.measurementRepository.find({
      where: {
        timestamp: MoreThan(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findLast60AndCount(): Promise<number> {
    const measurements = await this.measurementRepository
      .createQueryBuilder('measurement')
      .orderBy('measurement.id', 'DESC')
      .take(60)
      .getMany();

    return measurements.filter((measurement) => measurement.is_irregular)
      .length;
  }
}
