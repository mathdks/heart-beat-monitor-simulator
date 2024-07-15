import { Injectable } from '@nestjs/common';
import { IrregularityRepository } from 'src/irregularities/domain/repository/irregularity.repository';

@Injectable()
export class FinishIrregularityUseCase {
  constructor(
    private readonly irregularityRepository: IrregularityRepository,
  ) {}

  async execute(): Promise<void> {
    const irregularity =
      await this.irregularityRepository.findLastWithoutEndDate();

    irregularity.end = new Date();

    await this.irregularityRepository.save(irregularity);
  }
}
