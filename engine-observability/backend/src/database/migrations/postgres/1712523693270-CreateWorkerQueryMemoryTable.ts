import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkerQueryMemoryTable1712523693270
  implements MigrationInterface
{
  name = 'CreateWorkerQueryMemoryTable1712523693270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "query_worker_memory" ("id" SERIAL NOT NULL, "query_id" varchar(250), "used_memory" bigint, "worker_id" varchar(250), "inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_abdc7e1f63606445c9bc5eced23" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query_worker_memory"`);
  }
}
