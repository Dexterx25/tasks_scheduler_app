import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719086306737 implements MigrationInterface {
    name = 'Migration1719086306737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" ADD "email" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" ADD CONSTRAINT "UQ_b0ec96d2db67f0b7a21410f86e9" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" DROP CONSTRAINT "UQ_b0ec96d2db67f0b7a21410f86e9"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" DROP COLUMN "email"`);
    }

}
