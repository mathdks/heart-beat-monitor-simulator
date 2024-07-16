import { Injectable } from '@nestjs/common';
import { IrregularityRepository } from 'src/irregularities/domain/repository/irregularity.repository';

@Injectable()
export class FindAllIrregularitiesUseCase {
  constructor(
    private readonly irregularityRepository: IrregularityRepository,
  ) {}

  async execute() {
    return this.irregularityRepository.findAll();
  }
}
