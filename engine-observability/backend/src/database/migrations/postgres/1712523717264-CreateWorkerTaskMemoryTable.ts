import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkerTaskMemoryTable1712523717264
  implements MigrationInterface
{
  name = 'CreateWorkerTaskMemoryTable1712523717264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_worker_memory" ("id" SERIAL NOT NULL, "task" varchar(250), "used_memory" bigint, "worker_id" varchar(250), "inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_2ffe6fa7dd4cc47009367856a8c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task_worker_memory"`);
  }
}
