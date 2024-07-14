import { Controller, Get } from '@nestjs/common';

@Controller('irregularities')
export class IrregularitiesController {
  constructor() {}

  @Get()
  getIrregularities() {
    return 'Get irregularities';
  }
}
