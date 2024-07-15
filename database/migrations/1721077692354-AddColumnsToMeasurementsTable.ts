import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsToMeasurementsTable1721077692354
  implements MigrationInterface
{
  name = 'AddColumnsToMeasurementsTable1721077692354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "baseline" real NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "is_irregular" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP COLUMN "is_irregular"`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP COLUMN "baseline"`,
    );
  }
}
