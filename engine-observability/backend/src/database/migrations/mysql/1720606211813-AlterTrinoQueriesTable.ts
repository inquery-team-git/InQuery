import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTrinoQueriesTable1720606211813 implements MigrationInterface {
  name = 'AlterTrinoQueriesTable1720606211813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_cluster_insert_time\` ON \`worker_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_insert_time\` ON \`worker_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_insert_time\` ON \`query_worker_memory\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_createtime_cluster_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_createtime_cluster_state_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_createtime_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_inserted_at_cluster_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_inserted_at_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_queryid_cluster_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_sessionsource_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_sessionuser_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`query_metrics_state_IDX\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cluster_metrics_cluster_timestamp_IDX\` ON \`cluster_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`cluster_metrics_timestamps_IDX\` ON \`cluster_metrics\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`transaction_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`update_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`prepared_query\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`principal\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`trace_token\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`remote_client_address\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`user_agent\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`client_info\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`client_tags_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`session_properties_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`server_address\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`server_version\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`environment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`query_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`inputs_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`output_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failure_task\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failure_host\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failures_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`warnings_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failed_cpu_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`scheduled_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failed_scheduled_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`waiting_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`planning_cpu_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`input_blocked_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failed_input_blocked_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`output_blocked_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failed_output_blocked_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`physical_input_read_time_millis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`peak_task_memory_bytes\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`physical_input_bytes\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`physical_input_rows\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`internal_network_bytes\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`internal_network_rows\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`written_bytes\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`written_rows\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failed_cumulative_memory\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`completed_splits\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`retry_policy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`operator_summaries_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`query\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`query\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`cumulative_memory\` \`cumulative_memory\` double(10,2) NULL DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`cpu_time_millis\` \`cpu_time_millis\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`stage_info_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`stage_info_json\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`plan\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`plan\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`wall_time_millis\` \`wall_time_millis\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`execution_time_millis\` \`execution_time_millis\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`queued_time_millis\` \`queued_time_millis\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`planning_time_millis\` \`planning_time_millis\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`analysis_time_millis\` \`analysis_time_millis\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`peak_memory_bytes\` \`peak_memory_bytes\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`total_bytes\` \`total_bytes\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`total_rows\` \`total_rows\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`output_bytes\` \`output_bytes\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`output_rows\` \`output_rows\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`error_code\` \`error_code\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`error_type\` \`error_type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`failure_type\` \`failure_type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failure_message\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failure_message\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`resource_group_id\` \`resource_group_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_67c918e7576e6702c3c89298ab\` ON \`worker_metrics\` (\`insert_time\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_166af3fa68c3dcdbf5c079a308\` ON \`worker_metrics\` (\`cluster\`, \`insert_time\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_d01233f8cde7752e00796f4e43\` ON \`query_worker_memory\` (\`inserted_at\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_b3839ee14346e29439989d5a36\` ON \`query_metrics\` (\`createtime\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_b3bbfe84ff1d54f4514510bb64\` ON \`query_metrics\` (\`state\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_c0d5a2326814b2930649c7f3e7\` ON \`query_metrics\` (\`sessionuser\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_b82c8f480b508e21776437e273\` ON \`query_metrics\` (\`sessionsource\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_e7185c68c921388bb792a449f9\` ON \`query_metrics\` (\`inserted_at\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_13ac4457cc95e3f078972b8232\` ON \`query_metrics\` (\`cluster\`, \`queryid\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_25a56a426fed2bc56c2d672b88\` ON \`query_metrics\` (\`cluster\`, \`inserted_at\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_51eb647ac91c45a0eea45d9988\` ON \`query_metrics\` (\`cluster\`, \`createtime\`, \`state\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_961c3b0be1de76a1b415375430\` ON \`query_metrics\` (\`cluster\`, \`createtime\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_6f927cfec3866f92fd6919ecf0\` ON \`trino_queries\` (\`query_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_089b25b8f6ae80fca8ec41f609\` ON \`trino_queries\` (\`query_state\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_41d745cde35c7ed97d7a88efce\` ON \`trino_queries\` (\`user\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_4a8809ed98cbe81c94d4b8dfd3\` ON \`trino_queries\` (\`source\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_26fb1d172ef0e8ffa7edd8ba08\` ON \`trino_queries\` (\`catalog\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_cc400f0e81cb7799be5bad08fd\` ON \`cluster_metrics\` (\`timestamp\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_0a4a185f22f7da968cfcc67782\` ON \`cluster_metrics\` (\`cluster\`, \`timestamp\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_0a4a185f22f7da968cfcc67782\` ON \`cluster_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cc400f0e81cb7799be5bad08fd\` ON \`cluster_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_26fb1d172ef0e8ffa7edd8ba08\` ON \`trino_queries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4a8809ed98cbe81c94d4b8dfd3\` ON \`trino_queries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_41d745cde35c7ed97d7a88efce\` ON \`trino_queries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_089b25b8f6ae80fca8ec41f609\` ON \`trino_queries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6f927cfec3866f92fd6919ecf0\` ON \`trino_queries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_961c3b0be1de76a1b415375430\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_51eb647ac91c45a0eea45d9988\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_25a56a426fed2bc56c2d672b88\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13ac4457cc95e3f078972b8232\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e7185c68c921388bb792a449f9\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b82c8f480b508e21776437e273\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c0d5a2326814b2930649c7f3e7\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b3bbfe84ff1d54f4514510bb64\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b3839ee14346e29439989d5a36\` ON \`query_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d01233f8cde7752e00796f4e43\` ON \`query_worker_memory\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_166af3fa68c3dcdbf5c079a308\` ON \`worker_metrics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_67c918e7576e6702c3c89298ab\` ON \`worker_metrics\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`resource_group_id\` \`resource_group_id\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`failure_message\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failure_message\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`failure_type\` \`failure_type\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`error_type\` \`error_type\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`error_code\` \`error_code\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`output_rows\` \`output_rows\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`output_bytes\` \`output_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`total_rows\` \`total_rows\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`total_bytes\` \`total_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`peak_memory_bytes\` \`peak_memory_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`analysis_time_millis\` \`analysis_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`planning_time_millis\` \`planning_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`queued_time_millis\` \`queued_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`execution_time_millis\` \`execution_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`wall_time_millis\` \`wall_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`plan\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`plan\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`stage_info_json\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`stage_info_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`cpu_time_millis\` \`cpu_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` CHANGE \`cumulative_memory\` \`cumulative_memory\` double(22) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` DROP COLUMN \`query\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`query\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`operator_summaries_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`retry_policy\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`completed_splits\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failed_cumulative_memory\` double NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`written_rows\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`written_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`internal_network_rows\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`internal_network_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`physical_input_rows\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`physical_input_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`peak_task_memory_bytes\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`physical_input_read_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failed_output_blocked_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`output_blocked_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failed_input_blocked_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`input_blocked_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`planning_cpu_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`waiting_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failed_scheduled_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`scheduled_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failed_cpu_time_millis\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`warnings_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failures_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failure_host\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`failure_task\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`output_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`inputs_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`query_type\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`environment\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`server_version\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`server_address\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`session_properties_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`client_tags_json\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`client_info\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`user_agent\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`remote_client_address\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`trace_token\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`principal\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`prepared_query\` mediumtext CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`update_type\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`trino_queries\` ADD \`transaction_id\` varchar(255) CHARACTER SET "utf8mb3" COLLATE "utf8mb3_general_ci" NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`cluster_metrics_timestamps_IDX\` ON \`cluster_metrics\` (\`timestamp\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`cluster_metrics_cluster_timestamp_IDX\` ON \`cluster_metrics\` (\`timestamp\`, \`cluster\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_state_IDX\` ON \`query_metrics\` (\`state\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_sessionuser_IDX\` ON \`query_metrics\` (\`sessionuser\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_sessionsource_IDX\` ON \`query_metrics\` (\`sessionsource\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_queryid_cluster_IDX\` ON \`query_metrics\` (\`queryid\`, \`cluster\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_inserted_at_IDX\` ON \`query_metrics\` (\`inserted_at\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_inserted_at_cluster_IDX\` ON \`query_metrics\` (\`inserted_at\`, \`cluster\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_createtime_IDX\` ON \`query_metrics\` (\`createtime\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_createtime_cluster_state_IDX\` ON \`query_metrics\` (\`createtime\`, \`cluster\`, \`state\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`query_metrics_createtime_cluster_IDX\` ON \`query_metrics\` (\`cluster\`, \`createtime\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_insert_time\` ON \`query_worker_memory\` (\`inserted_at\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_insert_time\` ON \`worker_metrics\` (\`insert_time\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_cluster_insert_time\` ON \`worker_metrics\` (\`cluster\`, \`insert_time\`)`,
    );
  }
}
