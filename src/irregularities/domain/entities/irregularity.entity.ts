import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('irregularities')
export class Irregularity {
  constructor(partial: Partial<Irregularity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  start: Date;

  @Column({ type: 'timestamp', nullable: true })
  end: Date;
}
