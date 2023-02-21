import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1676728753166 implements MigrationInterface {
  name = 'Init1676728753166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grammy" boolean NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artist_id" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artist_id" uuid, "album_id" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_artist" ("id" SERIAL NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "PK_9c7c756540b38ffe4e419c8bc99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_album" ("id" SERIAL NOT NULL, "album_id" uuid NOT NULL, CONSTRAINT "PK_2e46772aaeeaa9770bdb59d4668" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_track" ("id" SERIAL NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "PK_d8d3b0b8b67970531d4a097a100" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_ecbc0c0cfffc519f7f2407b0465" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_ee355f43e4481bb45755c50e984" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_5902805b5cdc8b4fcf983f7df52" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artist" ADD CONSTRAINT "FK_a21f3a24b4ddb47e52bafe8076f" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_album" ADD CONSTRAINT "FK_18d961eeefada999285d821fe49" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_track" ADD CONSTRAINT "FK_a18e3e700a56da3c2aa401aea3c" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_track" DROP CONSTRAINT "FK_a18e3e700a56da3c2aa401aea3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_album" DROP CONSTRAINT "FK_18d961eeefada999285d821fe49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artist" DROP CONSTRAINT "FK_a21f3a24b4ddb47e52bafe8076f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_5902805b5cdc8b4fcf983f7df52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_ee355f43e4481bb45755c50e984"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_ecbc0c0cfffc519f7f2407b0465"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_track"`);
    await queryRunner.query(`DROP TABLE "favorites_album"`);
    await queryRunner.query(`DROP TABLE "favorites_artist"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "artist"`);
  }
}
