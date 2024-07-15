import { Injectable } from '@nestjs/common';
import { Irregularity } from 'src/irregularities/domain/entities/irregularity.entity';
import { IrregularityRepository } from 'src/irregularities/domain/repository/irregularity.repository';
import { CreateIrregularityDTO } from 'src/irregularities/infra/presentation/dto/createIrregularity.dto';

@Injectable()
export class CreateIrregularityUseCase {
  constructor(
    private readonly irregularityRepository: IrregularityRepository,
  ) {}

  async execute(data: CreateIrregularityDTO): Promise<void> {
    const irregularity = new Irregularity(data);
    await this.irregularityRepository.save(irregularity);
  }
}
