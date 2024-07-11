import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClusterMetricsTable1712523542121
  implements MigrationInterface
{
  name = 'CreateClusterMetricsTable1712523542121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cluster_metrics" ("id" SERIAL NOT NULL, "used_cpu" double precision DEFAULT '0.0', "total_cpu" double precision DEFAULT '0.0', "used_memory" bigint, "total_memory" bigint, "worker_count" integer, "uptime" bigint, "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7b2c0e7f06d7a3caca314988fa4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cluster_metrics"`);
  }
}
