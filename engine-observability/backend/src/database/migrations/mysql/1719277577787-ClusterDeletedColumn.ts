import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClusterDeletedColumn1719277577787 implements MigrationInterface {
  name = 'ClusterDeletedColumn1719277577787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clusters\` ADD \`deleted\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_a02700a6b1ee2f99fe16864010\` ON \`clusters\` (\`deleted\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b319162e5db994e71ca21da813\` ON \`clusters\` (\`client_id\`, \`host\`, \`port\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_b319162e5db994e71ca21da813\` ON \`clusters\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a02700a6b1ee2f99fe16864010\` ON \`clusters\``,
    );
    await queryRunner.query(`ALTER TABLE \`clusters\` DROP COLUMN \`deleted\``);
  }
}
