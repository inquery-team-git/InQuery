import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkerMetricsTable1712523652594
  implements MigrationInterface
{
  name = 'CreateWorkerMetricsTable1712523652594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "worker_metrics" ("id" SERIAL NOT NULL, "process_cpu_load" double precision DEFAULT '0.0', "system_cpu_load" double precision DEFAULT '0.0', "processor_count" integer, "heap_memory_used" bigint, "heap_memory_available" bigint, "free_memory_bytes" bigint, "system_uptime" double precision DEFAULT '0.0', "worker_id" varchar, "insert_time" TIMESTAMP WITH TIME ZONE DEFAULT now(), "num_tasks" bigint, CONSTRAINT "PK_312b3d0080db5bd9edc23a14dfe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "worker_metrics"`);
  }
}
