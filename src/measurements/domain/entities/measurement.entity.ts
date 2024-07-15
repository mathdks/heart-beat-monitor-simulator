import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('measurements')
export class Measurement {
  constructor(partial: Partial<Measurement>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real', nullable: false })
  value: number;

  @Column({ type: 'real', nullable: false })
  baseline: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  is_irregular: boolean;

  @CreateDateColumn()
  timestamp: Date;
}
