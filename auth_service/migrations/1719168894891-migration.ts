import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719168894891 implements MigrationInterface {
    name = 'Migration1719168894891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ADD "refresh_token" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ADD "refresh_token" character varying(250) NOT NULL`);
    }

}
