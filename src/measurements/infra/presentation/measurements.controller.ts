import { Controller, Get } from '@nestjs/common';
import { FindAllMeasurementsUseCase } from 'src/measurements/application/use-cases/findAllMeasurements.use-case';

@Controller('measurements')
export class MeasurementsController {
  constructor(
    private readonly findAllMeasurementsUseCase: FindAllMeasurementsUseCase,
  ) {}

  @Get()
  getMeasurements() {
    return this.findAllMeasurementsUseCase.execute();
  }
}
