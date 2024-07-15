import { InjectRepository } from '@nestjs/typeorm';
import { Irregularity } from 'src/irregularities/domain/entities/irregularity.entity';
import { IrregularityRepository } from 'src/irregularities/domain/repository/irregularity.repository';
import { IsNull, Repository } from 'typeorm';

export class IrregularityAdapter implements IrregularityRepository {
  constructor(
    @InjectRepository(Irregularity)
    private readonly repository: Repository<Irregularity>
  ) {}

  async save(irregularity: Irregularity): Promise<void> {
    await this.repository.save(irregularity);
  }

  async findAll(): Promise<Irregularity[]> {
    return await this.repository.find();
  }

  async findLastWithoutEndDate(): Promise<Irregularity> {
    return await this.repository.findOne({
      where: {
        end: IsNull(),
      },
    });
  }
}
