import { Controller, Get } from '@nestjs/common';
import { FindAllIrregularitiesUseCase } from 'src/irregularities/application/use-cases/findAllIrregularities.use-case';

@Controller('irregularities')
export class IrregularitiesController {
  constructor(
    private readonly findAllIrregularitiesUseCase: FindAllIrregularitiesUseCase,
  ) {}

  @Get()
  getIrregularities() {
    return this.findAllIrregularitiesUseCase.execute();
  }
}
