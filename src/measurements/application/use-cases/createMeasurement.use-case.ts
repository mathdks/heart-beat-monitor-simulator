import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateIrregularityUseCase } from 'src/irregularities/application/use-cases/createIrregularity.use-case';
import { FinishIrregularityUseCase } from 'src/irregularities/application/use-cases/finishIrregularity.use-case';
import { Measurement } from 'src/measurements/domain/entities/measurement.entity';
import { MeasurementRepository } from 'src/measurements/domain/repository/measurements.repository';
import { CreateMeasurementDTO } from 'src/measurements/infra/presentation/dto/createMeasurement.dto';
import { MeasurementsGateway } from 'src/measurements/infra/presentation/measurements.gateway';

@Injectable()
export class CreateMeasurementUseCase {
  constructor(
    private readonly measurementRepository: MeasurementRepository,
    private readonly createIrregularityUseCase: CreateIrregularityUseCase,
    private readonly finishIrregularityUseCase: FinishIrregularityUseCase,
    @Inject(forwardRef(() => MeasurementsGateway))
    private readonly measurementsGateway: MeasurementsGateway,
  ) {}

  private IRREGULARITY_CREATED = false;

  async execute(data: CreateMeasurementDTO): Promise<Measurement> {
    const measurement = new Measurement(data);

    const baseline = this.calculateBaseline(data.timestamp);

    measurement.baseline = baseline;

    const absoluteDifference = Math.abs(measurement.value - baseline);

    const percentageDifference = (absoluteDifference / baseline) * 100;

    if (percentageDifference > 20) {
      measurement.is_irregular = true;
    }

    const newMeasurement = await this.measurementRepository.save(measurement);

    this.verifyIrregularity(newMeasurement);

    return newMeasurement;
  }

  private calculateBaseline(timestamp: Date): number {
    const miliseconds = new Date(timestamp).getTime();

    const step1 = -0.06366;
    const step2 = 0.12613 * Math.cos(miliseconds / 500);
    const step3 = 0.12258 * Math.cos(miliseconds / 250);
    const step4 = 0.01593 * Math.sin(miliseconds / 500);
    const step5 = 0.03147 * Math.sin(miliseconds / 250);

    return step1 + step2 + step3 + step4 + step5;
  }

  private async verifyIrregularity(measurement: Measurement): Promise<void> {
    const irregularitiesOnlast60Created =
      await this.measurementRepository.findLast60AndCount();

    if (this.IRREGULARITY_CREATED && irregularitiesOnlast60Created === 0) {
      this.IRREGULARITY_CREATED = false;
      this.finishIrregularityUseCase.execute();

      this.measurementsGateway.emitBipBip();
    }

    if (!this.IRREGULARITY_CREATED && irregularitiesOnlast60Created === 5) {
      this.IRREGULARITY_CREATED = true;
      await this.createIrregularityUseCase.execute({
        start: measurement.timestamp,
      });

      this.measurementsGateway.emitBip();
    }
  }
}
