import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQueryMetricsTable1712523602851
  implements MigrationInterface
{
  name = 'CreateQueryMetricsTable1712523602851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "query_metrics" ("queryid" (255) NOT NULL, "createtime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "totalcputime" double precision DEFAULT '0.0', "cumulativeusermemory" double precision DEFAULT '0.0', "state" (50), "sessionuser" (255), "sessionsource" (255), "inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_e6e1fb07f0f04a8aa048771a99d" PRIMARY KEY ("queryid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query_metrics"`);
  }
}
