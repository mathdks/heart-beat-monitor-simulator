import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMeasurementsAndIrregularitiesTables1720761529808
  implements MigrationInterface
{
  name = 'CreateMeasurementsAndIrregularitiesTables1720761529808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "measurements" ("id" SERIAL NOT NULL, "value" real NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "irregularities" ("id" SERIAL NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP, CONSTRAINT "PK_7800a1ea4cc3d77dbfd30d4616f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "irregularities"`);
    await queryRunner.query(`DROP TABLE "measurements"`);
  }
}
