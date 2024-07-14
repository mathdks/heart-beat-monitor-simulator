import { Controller, Get } from '@nestjs/common';

@Controller('measurements')
export class MeasurementsController {
  constructor() {}

  @Get()
  getMeasurements() {
    return 'Get measurements';
  }
}
