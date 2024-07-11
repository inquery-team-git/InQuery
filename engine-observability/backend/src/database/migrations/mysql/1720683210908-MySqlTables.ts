import { MigrationInterface, QueryRunner } from "typeorm";

export class MySqlTables1720683210908 implements MigrationInterface {
    name = 'MySqlTables1720683210908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`query_worker_memory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`query_id\` varchar(255) NULL, \`used_memory\` bigint NULL, \`worker_id\` varchar(255) NULL, \`inserted_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_fd4c8faa46566638ca8c50fd68\` (\`query_id\`), INDEX \`IDX_367b5ea247b1f0c81de7e2c73a\` (\`worker_id\`), INDEX \`IDX_d01233f8cde7752e00796f4e43\` (\`inserted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_worker_memory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`task\` varchar(255) NULL, \`used_memory\` bigint NULL, \`worker_id\` varchar(255) NULL, \`inserted_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_8597ee005c6aae8cb416fb4b70\` (\`task\`), INDEX \`IDX_bcd8ebca600c2f279fd4a39ed5\` (\`worker_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clusters\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(2000) NOT NULL, \`client_id\` varchar(255) NOT NULL, \`host\` varchar(255) NOT NULL, \`port\` varchar(255) NOT NULL, \`description\` varchar(2000) NULL, \`enabled\` tinyint NOT NULL DEFAULT 1, \`deleted\` tinyint NOT NULL DEFAULT 0, \`timestamp\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_607951b8d0657190cf390be13a\` (\`client_id\`), INDEX \`IDX_d267cf7acc71a5697acc31039a\` (\`enabled\`), INDEX \`IDX_a02700a6b1ee2f99fe16864010\` (\`deleted\`), UNIQUE INDEX \`IDX_b319162e5db994e71ca21da813\` (\`client_id\`, \`host\`, \`port\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`worker_metrics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`process_cpu_load\` double(10,2) NULL DEFAULT '0.00', \`system_cpu_load\` double(10,2) NULL DEFAULT '0.00', \`processor_count\` int NULL, \`heap_memory_used\` bigint NULL, \`heap_memory_available\` bigint NULL, \`free_memory_bytes\` bigint NULL, \`system_uptime\` double(10,2) NULL DEFAULT '0.00', \`worker_id\` varchar(255) NULL, \`insert_time\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`num_tasks\` bigint NULL, \`cluster\` varchar(36) NULL, INDEX \`IDX_89b5085a658376910894e28124\` (\`cluster\`), INDEX \`IDX_fb67d3f4ec48a1fdc047f59096\` (\`worker_id\`), INDEX \`IDX_67c918e7576e6702c3c89298ab\` (\`insert_time\`), INDEX \`IDX_166af3fa68c3dcdbf5c079a308\` (\`cluster\`, \`insert_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`provider\` varchar(255) NOT NULL DEFAULT 'email', \`socialId\` varchar(255) NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`photoId\` varchar(36) NULL, \`roleId\` int NULL, \`statusId\` int NULL, INDEX \`IDX_9bd2fe7a8e694dedc4ec2f666f\` (\`socialId\`), INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` (\`firstName\`), INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` (\`lastName\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_performance_metrics\` (\`task_names\` varchar(250) NOT NULL, \`elapsed\` varchar(250) NULL, \`queued\` varchar(250) NULL, \`start\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`end_time\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`node\` varchar(250) NULL, \`drivers\` int NULL, \`total_scheduled_time\` varchar(250) NULL, \`total_cpu_time\` varchar(250) NULL, \`total_blocked_time\` varchar(250) NULL, \`processed_input_data_size\` varchar(250) NULL, \`processed_input_positions\` int NULL, \`time_difference_seconds\` double(10,2) NULL DEFAULT '0.00', \`total_time_stage\` double(10,2) NULL DEFAULT '0.00', \`max_child_end\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`inserted_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_ee41b9a8b659157579c1e8a74f\` (\`task_names\`), PRIMARY KEY (\`task_names\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_3d2f174ef04fb312fdebd0ddc5\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`query_metrics\` (\`queryid\` varchar(250) NOT NULL, \`createtime\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`totalcputime\` double(10,2) NULL DEFAULT '0.00', \`cumulativeusermemory\` double(10,2) NULL DEFAULT '0.00', \`state\` varchar(50) NULL, \`sessionuser\` varchar(250) NULL, \`sessionsource\` varchar(250) NULL, \`inserted_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`cluster\` varchar(36) NULL, INDEX \`IDX_e6e1fb07f0f04a8aa048771a99\` (\`queryid\`), INDEX \`IDX_7c4a777479bd88ba448d416080\` (\`cluster\`), INDEX \`IDX_b3839ee14346e29439989d5a36\` (\`createtime\`), INDEX \`IDX_b3bbfe84ff1d54f4514510bb64\` (\`state\`), INDEX \`IDX_c0d5a2326814b2930649c7f3e7\` (\`sessionuser\`), INDEX \`IDX_b82c8f480b508e21776437e273\` (\`sessionsource\`), INDEX \`IDX_e7185c68c921388bb792a449f9\` (\`inserted_at\`), INDEX \`IDX_13ac4457cc95e3f078972b8232\` (\`cluster\`, \`queryid\`), INDEX \`IDX_25a56a426fed2bc56c2d672b88\` (\`cluster\`, \`inserted_at\`), INDEX \`IDX_51eb647ac91c45a0eea45d9988\` (\`cluster\`, \`createtime\`, \`state\`), INDEX \`IDX_961c3b0be1de76a1b415375430\` (\`cluster\`, \`createtime\`), PRIMARY KEY (\`queryid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trino_queries\` (\`query_id\` varchar(255) NOT NULL, \`query\` text NOT NULL, \`query_state\` varchar(255) NOT NULL, \`user\` varchar(255) NOT NULL, \`source\` varchar(255) NULL, \`catalog\` varchar(255) NULL, \`schema\` varchar(255) NULL, \`cumulative_memory\` double(10,2) NULL DEFAULT '0.00', \`cpu_time_millis\` bigint NULL, \`stage_info_json\` text NULL, \`plan\` text NOT NULL, \`wall_time_millis\` bigint NULL, \`execution_time_millis\` bigint NULL, \`queued_time_millis\` bigint NULL, \`planning_time_millis\` bigint NULL, \`analysis_time_millis\` bigint NULL, \`peak_memory_bytes\` bigint NULL, \`total_bytes\` bigint NULL, \`total_rows\` bigint NULL, \`output_bytes\` bigint NULL, \`output_rows\` bigint NULL, \`error_code\` varchar(255) NOT NULL, \`error_type\` varchar(255) NOT NULL, \`failure_type\` varchar(255) NOT NULL, \`failure_message\` varchar(255) NOT NULL, \`resource_group_id\` varchar(255) NOT NULL, INDEX \`IDX_6f927cfec3866f92fd6919ecf0\` (\`query_id\`), INDEX \`IDX_089b25b8f6ae80fca8ec41f609\` (\`query_state\`), INDEX \`IDX_41d745cde35c7ed97d7a88efce\` (\`user\`), INDEX \`IDX_4a8809ed98cbe81c94d4b8dfd3\` (\`source\`), INDEX \`IDX_26fb1d172ef0e8ffa7edd8ba08\` (\`catalog\`), PRIMARY KEY (\`query_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cluster_worker_mappings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`worker\` varchar(255) NOT NULL, \`timestamp\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`cluster\` varchar(36) NULL, INDEX \`IDX_5aba47fb480894daca5a20207f\` (\`cluster\`), INDEX \`IDX_0188c828251cbb376cea40b7b6\` (\`worker\`), UNIQUE INDEX \`IDX_4f2eeb4aaa2dd21af43d5559cd\` (\`cluster\`, \`worker\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cluster_metrics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`used_cpu\` double(10,2) NULL DEFAULT '0.00', \`total_cpu\` double(10,2) NULL DEFAULT '0.00', \`used_memory\` bigint NULL, \`total_memory\` bigint NULL, \`worker_count\` int NULL, \`uptime\` bigint NULL, \`timestamp\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`cluster\` varchar(36) NULL, INDEX \`IDX_23a8822a055a4f4a98d302a106\` (\`cluster\`), INDEX \`IDX_cc400f0e81cb7799be5bad08fd\` (\`timestamp\`), INDEX \`IDX_0a4a185f22f7da968cfcc67782\` (\`cluster\`, \`timestamp\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`worker_metrics\` ADD CONSTRAINT \`FK_89b5085a658376910894e28124c\` FOREIGN KEY (\`cluster\`) REFERENCES \`clusters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_75e2be4ce11d447ef43be0e374f\` FOREIGN KEY (\`photoId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_dc18daa696860586ba4667a9d31\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_3d2f174ef04fb312fdebd0ddc53\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`query_metrics\` ADD CONSTRAINT \`FK_7c4a777479bd88ba448d416080e\` FOREIGN KEY (\`cluster\`) REFERENCES \`clusters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cluster_worker_mappings\` ADD CONSTRAINT \`FK_5aba47fb480894daca5a20207f2\` FOREIGN KEY (\`cluster\`) REFERENCES \`clusters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cluster_metrics\` ADD CONSTRAINT \`FK_23a8822a055a4f4a98d302a106b\` FOREIGN KEY (\`cluster\`) REFERENCES \`clusters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cluster_metrics\` DROP FOREIGN KEY \`FK_23a8822a055a4f4a98d302a106b\``);
        await queryRunner.query(`ALTER TABLE \`cluster_worker_mappings\` DROP FOREIGN KEY \`FK_5aba47fb480894daca5a20207f2\``);
        await queryRunner.query(`ALTER TABLE \`query_metrics\` DROP FOREIGN KEY \`FK_7c4a777479bd88ba448d416080e\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_3d2f174ef04fb312fdebd0ddc53\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_dc18daa696860586ba4667a9d31\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_75e2be4ce11d447ef43be0e374f\``);
        await queryRunner.query(`ALTER TABLE \`worker_metrics\` DROP FOREIGN KEY \`FK_89b5085a658376910894e28124c\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a4a185f22f7da968cfcc67782\` ON \`cluster_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc400f0e81cb7799be5bad08fd\` ON \`cluster_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_23a8822a055a4f4a98d302a106\` ON \`cluster_metrics\``);
        await queryRunner.query(`DROP TABLE \`cluster_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_4f2eeb4aaa2dd21af43d5559cd\` ON \`cluster_worker_mappings\``);
        await queryRunner.query(`DROP INDEX \`IDX_0188c828251cbb376cea40b7b6\` ON \`cluster_worker_mappings\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aba47fb480894daca5a20207f\` ON \`cluster_worker_mappings\``);
        await queryRunner.query(`DROP TABLE \`cluster_worker_mappings\``);
        await queryRunner.query(`DROP INDEX \`IDX_26fb1d172ef0e8ffa7edd8ba08\` ON \`trino_queries\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a8809ed98cbe81c94d4b8dfd3\` ON \`trino_queries\``);
        await queryRunner.query(`DROP INDEX \`IDX_41d745cde35c7ed97d7a88efce\` ON \`trino_queries\``);
        await queryRunner.query(`DROP INDEX \`IDX_089b25b8f6ae80fca8ec41f609\` ON \`trino_queries\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f927cfec3866f92fd6919ecf0\` ON \`trino_queries\``);
        await queryRunner.query(`DROP TABLE \`trino_queries\``);
        await queryRunner.query(`DROP INDEX \`IDX_961c3b0be1de76a1b415375430\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_51eb647ac91c45a0eea45d9988\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_25a56a426fed2bc56c2d672b88\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_13ac4457cc95e3f078972b8232\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7185c68c921388bb792a449f9\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_b82c8f480b508e21776437e273\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0d5a2326814b2930649c7f3e7\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3bbfe84ff1d54f4514510bb64\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3839ee14346e29439989d5a36\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_7c4a777479bd88ba448d416080\` ON \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6e1fb07f0f04a8aa048771a99\` ON \`query_metrics\``);
        await queryRunner.query(`DROP TABLE \`query_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d2f174ef04fb312fdebd0ddc5\` ON \`session\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee41b9a8b659157579c1e8a74f\` ON \`task_performance_metrics\``);
        await queryRunner.query(`DROP TABLE \`task_performance_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_166af3fa68c3dcdbf5c079a308\` ON \`worker_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_67c918e7576e6702c3c89298ab\` ON \`worker_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_fb67d3f4ec48a1fdc047f59096\` ON \`worker_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_89b5085a658376910894e28124\` ON \`worker_metrics\``);
        await queryRunner.query(`DROP TABLE \`worker_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_b319162e5db994e71ca21da813\` ON \`clusters\``);
        await queryRunner.query(`DROP INDEX \`IDX_a02700a6b1ee2f99fe16864010\` ON \`clusters\``);
        await queryRunner.query(`DROP INDEX \`IDX_d267cf7acc71a5697acc31039a\` ON \`clusters\``);
        await queryRunner.query(`DROP INDEX \`IDX_607951b8d0657190cf390be13a\` ON \`clusters\``);
        await queryRunner.query(`DROP TABLE \`clusters\``);
        await queryRunner.query(`DROP INDEX \`IDX_bcd8ebca600c2f279fd4a39ed5\` ON \`task_worker_memory\``);
        await queryRunner.query(`DROP INDEX \`IDX_8597ee005c6aae8cb416fb4b70\` ON \`task_worker_memory\``);
        await queryRunner.query(`DROP TABLE \`task_worker_memory\``);
        await queryRunner.query(`DROP INDEX \`IDX_d01233f8cde7752e00796f4e43\` ON \`query_worker_memory\``);
        await queryRunner.query(`DROP INDEX \`IDX_367b5ea247b1f0c81de7e2c73a\` ON \`query_worker_memory\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd4c8faa46566638ca8c50fd68\` ON \`query_worker_memory\``);
        await queryRunner.query(`DROP TABLE \`query_worker_memory\``);
    }

}
