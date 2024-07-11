import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskMetricsTable1712523633936 implements MigrationInterface {
  name = 'CreateTaskMetricsTable1712523633936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_performance_metrics" ("task_names" varchar(250) NOT NULL, "elapsed" varchar(250), "queued" varchar(250), "start" TIMESTAMP WITH TIME ZONE DEFAULT now(), "end_time" varchar(250), "node" varchar(250), "drivers" integer, "total_scheduled_time" varchar(250), "total_cpu_time" varchar(250), "total_blocked_time" varchar(250), "processed_input_data_size" varchar(250), "processed_input_positions" integer, "time_difference_seconds" double precision DEFAULT '0.0', "total_time_stage" double precision DEFAULT '0.0', "max_child_end" TIMESTAMP WITH TIME ZONE DEFAULT now(), "inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_ee41b9a8b659157579c1e8a74fc" PRIMARY KEY ("task_names"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task_performance_metrics"`);
  }
}
