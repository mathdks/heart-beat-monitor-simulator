import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Irregularity } from './domain/entities/irregularity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Irregularity])],
  controllers: [],
  providers: [],
})
export class IrregularitiesModule {}
