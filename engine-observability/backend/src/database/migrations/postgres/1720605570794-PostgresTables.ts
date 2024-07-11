import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresTables1720605570794 implements MigrationInterface {
  name = 'PostgresTables1720605570794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_worker_memory" ("id" SERIAL NOT NULL, "task" character varying, "used_memory" bigint, "worker_id" character varying, "inserted_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_2ffe6fa7dd4cc47009367856a8c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8597ee005c6aae8cb416fb4b70" ON "task_worker_memory" ("task") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bcd8ebca600c2f279fd4a39ed5" ON "task_worker_memory" ("worker_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "query_worker_memory" ("id" SERIAL NOT NULL, "query_id" character varying, "used_memory" bigint, "worker_id" character varying, "inserted_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_abdc7e1f63606445c9bc5eced23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd4c8faa46566638ca8c50fd68" ON "query_worker_memory" ("query_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_367b5ea247b1f0c81de7e2c73a" ON "query_worker_memory" ("worker_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d01233f8cde7752e00796f4e43" ON "query_worker_memory" ("inserted_at") `,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "clusters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(2000) NOT NULL, "client_id" character varying NOT NULL, "host" character varying NOT NULL, "port" character varying NOT NULL, "description" character varying(2000), "enabled" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_56c8e201f375e1e961dcdd6831c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_607951b8d0657190cf390be13a" ON "clusters" ("client_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d267cf7acc71a5697acc31039a" ON "clusters" ("enabled") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a02700a6b1ee2f99fe16864010" ON "clusters" ("deleted") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b319162e5db994e71ca21da813" ON "clusters" ("client_id", "host", "port") `,
    );
    await queryRunner.query(
      `CREATE TABLE "worker_metrics" ("id" SERIAL NOT NULL, "process_cpu_load" double precision DEFAULT '0.0', "system_cpu_load" double precision DEFAULT '0.0', "processor_count" integer, "heap_memory_used" bigint, "heap_memory_available" bigint, "free_memory_bytes" bigint, "system_uptime" double precision DEFAULT '0.0', "worker_id" character varying, "insert_time" TIMESTAMP DEFAULT now(), "num_tasks" bigint, "cluster" uuid, CONSTRAINT "PK_312b3d0080db5bd9edc23a14dfe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_89b5085a658376910894e28124" ON "worker_metrics" ("cluster") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb67d3f4ec48a1fdc047f59096" ON "worker_metrics" ("worker_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67c918e7576e6702c3c89298ab" ON "worker_metrics" ("insert_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_166af3fa68c3dcdbf5c079a308" ON "worker_metrics" ("cluster", "insert_time") `,
    );
    await queryRunner.query(
      `CREATE TABLE "task_performance_metrics" ("task_names" character varying(250) NOT NULL, "elapsed" character varying(250), "queued" character varying(250), "start" TIMESTAMP DEFAULT now(), "end_time" TIMESTAMP DEFAULT now(), "node" character varying(250), "drivers" integer, "total_scheduled_time" character varying(250), "total_cpu_time" character varying(250), "total_blocked_time" character varying(250), "processed_input_data_size" character varying(250), "processed_input_positions" integer, "time_difference_seconds" double precision DEFAULT '0.0', "total_time_stage" double precision DEFAULT '0.0', "max_child_end" TIMESTAMP DEFAULT now(), "inserted_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_ee41b9a8b659157579c1e8a74fc" PRIMARY KEY ("task_names"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee41b9a8b659157579c1e8a74f" ON "task_performance_metrics" ("task_names") `,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "trino_queries" ("query_id" character varying(255) NOT NULL, "query" text NOT NULL, "query_state" character varying(255) NOT NULL, "user" character varying(255) NOT NULL, "source" character varying(255), "catalog" character varying(255), "schema" character varying(255), "cumulative_memory" double precision DEFAULT '0.0', "cpu_time_millis" bigint, "stage_info_json" text, "plan" text NOT NULL, "wall_time_millis" bigint, "execution_time_millis" bigint, "queued_time_millis" bigint, "planning_time_millis" bigint, "analysis_time_millis" bigint, "peak_memory_bytes" bigint, "total_bytes" bigint, "total_rows" bigint, "output_bytes" bigint, "output_rows" bigint, "error_code" character varying(255) NOT NULL, "error_type" character varying(255) NOT NULL, "failure_type" character varying(255) NOT NULL, "failure_message" character varying(255) NOT NULL, "resource_group_id" character varying(255) NOT NULL, CONSTRAINT "PK_6f927cfec3866f92fd6919ecf02" PRIMARY KEY ("query_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6f927cfec3866f92fd6919ecf0" ON "trino_queries" ("query_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_089b25b8f6ae80fca8ec41f609" ON "trino_queries" ("query_state") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41d745cde35c7ed97d7a88efce" ON "trino_queries" ("user") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a8809ed98cbe81c94d4b8dfd3" ON "trino_queries" ("source") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26fb1d172ef0e8ffa7edd8ba08" ON "trino_queries" ("catalog") `,
    );
    await queryRunner.query(
      `CREATE TABLE "query_metrics" ("queryid" character varying(250) NOT NULL, "createtime" TIMESTAMP DEFAULT now(), "totalcputime" double precision DEFAULT '0.0', "cumulativeusermemory" double precision DEFAULT '0.0', "state" character varying(50), "sessionuser" character varying(250), "sessionsource" character varying(250), "inserted_at" TIMESTAMP DEFAULT now(), "cluster" uuid, CONSTRAINT "PK_e6e1fb07f0f04a8aa048771a99d" PRIMARY KEY ("queryid"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e6e1fb07f0f04a8aa048771a99" ON "query_metrics" ("queryid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7c4a777479bd88ba448d416080" ON "query_metrics" ("cluster") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3839ee14346e29439989d5a36" ON "query_metrics" ("createtime") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3bbfe84ff1d54f4514510bb64" ON "query_metrics" ("state") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0d5a2326814b2930649c7f3e7" ON "query_metrics" ("sessionuser") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b82c8f480b508e21776437e273" ON "query_metrics" ("sessionsource") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e7185c68c921388bb792a449f9" ON "query_metrics" ("inserted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13ac4457cc95e3f078972b8232" ON "query_metrics" ("cluster", "queryid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25a56a426fed2bc56c2d672b88" ON "query_metrics" ("cluster", "inserted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51eb647ac91c45a0eea45d9988" ON "query_metrics" ("cluster", "createtime", "state") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_961c3b0be1de76a1b415375430" ON "query_metrics" ("cluster", "createtime") `,
    );
    await queryRunner.query(
      `CREATE TABLE "cluster_worker_mappings" ("id" SERIAL NOT NULL, "worker" character varying NOT NULL, "timestamp" TIMESTAMP DEFAULT now(), "cluster" uuid, CONSTRAINT "PK_e35871c495785a0415fdcc1eb49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5aba47fb480894daca5a20207f" ON "cluster_worker_mappings" ("cluster") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0188c828251cbb376cea40b7b6" ON "cluster_worker_mappings" ("worker") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4f2eeb4aaa2dd21af43d5559cd" ON "cluster_worker_mappings" ("cluster", "worker") `,
    );
    await queryRunner.query(
      `CREATE TABLE "cluster_metrics" ("id" SERIAL NOT NULL, "used_cpu" double precision DEFAULT '0.0', "total_cpu" double precision DEFAULT '0.0', "used_memory" bigint, "total_memory" bigint, "worker_count" integer, "uptime" bigint, "timestamp" TIMESTAMP DEFAULT now(), "cluster" uuid, CONSTRAINT "PK_7b2c0e7f06d7a3caca314988fa4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23a8822a055a4f4a98d302a106" ON "cluster_metrics" ("cluster") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cc400f0e81cb7799be5bad08fd" ON "cluster_metrics" ("timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a4a185f22f7da968cfcc67782" ON "cluster_metrics" ("cluster", "timestamp") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "worker_metrics" ADD CONSTRAINT "FK_89b5085a658376910894e28124c" FOREIGN KEY ("cluster") REFERENCES "clusters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "query_metrics" ADD CONSTRAINT "FK_7c4a777479bd88ba448d416080e" FOREIGN KEY ("cluster") REFERENCES "clusters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cluster_worker_mappings" ADD CONSTRAINT "FK_5aba47fb480894daca5a20207f2" FOREIGN KEY ("cluster") REFERENCES "clusters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cluster_metrics" ADD CONSTRAINT "FK_23a8822a055a4f4a98d302a106b" FOREIGN KEY ("cluster") REFERENCES "clusters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cluster_metrics" DROP CONSTRAINT "FK_23a8822a055a4f4a98d302a106b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cluster_worker_mappings" DROP CONSTRAINT "FK_5aba47fb480894daca5a20207f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "query_metrics" DROP CONSTRAINT "FK_7c4a777479bd88ba448d416080e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "worker_metrics" DROP CONSTRAINT "FK_89b5085a658376910894e28124c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0a4a185f22f7da968cfcc67782"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cc400f0e81cb7799be5bad08fd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_23a8822a055a4f4a98d302a106"`,
    );
    await queryRunner.query(`DROP TABLE "cluster_metrics"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f2eeb4aaa2dd21af43d5559cd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0188c828251cbb376cea40b7b6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5aba47fb480894daca5a20207f"`,
    );
    await queryRunner.query(`DROP TABLE "cluster_worker_mappings"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_961c3b0be1de76a1b415375430"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51eb647ac91c45a0eea45d9988"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_25a56a426fed2bc56c2d672b88"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13ac4457cc95e3f078972b8232"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e7185c68c921388bb792a449f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b82c8f480b508e21776437e273"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0d5a2326814b2930649c7f3e7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3bbfe84ff1d54f4514510bb64"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3839ee14346e29439989d5a36"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7c4a777479bd88ba448d416080"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e6e1fb07f0f04a8aa048771a99"`,
    );
    await queryRunner.query(`DROP TABLE "query_metrics"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_26fb1d172ef0e8ffa7edd8ba08"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4a8809ed98cbe81c94d4b8dfd3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41d745cde35c7ed97d7a88efce"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_089b25b8f6ae80fca8ec41f609"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6f927cfec3866f92fd6919ecf0"`,
    );
    await queryRunner.query(`DROP TABLE "trino_queries"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee41b9a8b659157579c1e8a74f"`,
    );
    await queryRunner.query(`DROP TABLE "task_performance_metrics"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_166af3fa68c3dcdbf5c079a308"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_67c918e7576e6702c3c89298ab"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb67d3f4ec48a1fdc047f59096"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_89b5085a658376910894e28124"`,
    );
    await queryRunner.query(`DROP TABLE "worker_metrics"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b319162e5db994e71ca21da813"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a02700a6b1ee2f99fe16864010"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d267cf7acc71a5697acc31039a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_607951b8d0657190cf390be13a"`,
    );
    await queryRunner.query(`DROP TABLE "clusters"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d01233f8cde7752e00796f4e43"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_367b5ea247b1f0c81de7e2c73a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd4c8faa46566638ca8c50fd68"`,
    );
    await queryRunner.query(`DROP TABLE "query_worker_memory"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bcd8ebca600c2f279fd4a39ed5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8597ee005c6aae8cb416fb4b70"`,
    );
    await queryRunner.query(`DROP TABLE "task_worker_memory"`);
  }
}
