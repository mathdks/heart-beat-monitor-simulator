import { Measurement } from '../entities/measurement.entity';

export abstract class MeasurementRepository {
  abstract save(measurement: Measurement): Promise<Measurement>;
  abstract findAll(): Promise<Measurement[]>;
  abstract findLast60AndCount(): Promise<number>;
}
