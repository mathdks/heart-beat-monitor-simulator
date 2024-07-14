import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Irregularity } from './domain/entities/irregularity.entity';
import { IrregularitiesController } from './infra/presentation/irregularities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Irregularity])],
  controllers: [IrregularitiesController],
  providers: [],
})
export class IrregularitiesModule {}
