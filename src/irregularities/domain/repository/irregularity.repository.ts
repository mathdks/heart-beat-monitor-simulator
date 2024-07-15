import { Irregularity } from '../entities/irregularity.entity';

export abstract class IrregularityRepository {
  abstract save(irregularity: Irregularity): Promise<void>;
  abstract findAll(): Promise<Irregularity[]>;
  abstract findLastWithoutEndDate(): Promise<Irregularity>;
}
