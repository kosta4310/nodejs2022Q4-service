import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueLogin1677412776105 implements MigrationInterface {
  name = 'AddUniqueLogin1677412776105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"`,
    );
  }
}
