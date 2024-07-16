import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Irregularity } from './domain/entities/irregularity.entity';
import { IrregularitiesController } from './infra/presentation/irregularities.controller';
import { CreateIrregularityUseCase } from './application/use-cases/createIrregularity.use-case';
import { IrregularityRepository } from './domain/repository/irregularity.repository';
import { IrregularityAdapter } from './infra/adapters/irregularity.adapter';
import { FinishIrregularityUseCase } from './application/use-cases/finishIrregularity.use-case';
import { FindAllIrregularitiesUseCase } from './application/use-cases/findAllIrregularities.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Irregularity])],
  controllers: [IrregularitiesController],
  providers: [
    CreateIrregularityUseCase,
    FinishIrregularityUseCase,
    FindAllIrregularitiesUseCase,
    {
      provide: IrregularityRepository,
      useClass: IrregularityAdapter,
    },
  ],
  exports: [CreateIrregularityUseCase, FinishIrregularityUseCase],
})
export class IrregularitiesModule {}
