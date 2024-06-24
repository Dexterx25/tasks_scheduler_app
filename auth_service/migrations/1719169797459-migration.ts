import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719169797459 implements MigrationInterface {
    name = 'Migration1719169797459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" DROP CONSTRAINT "FK_b5a38e2083bdc908955a72428b2"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" DROP CONSTRAINT "FK_5103115855a17fcfe37d203d1fb"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" DROP CONSTRAINT "FK_e8dd2d6421a0affa254757435a4"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" DROP CONSTRAINT "FK_0008147023706fac211a3486987"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" ALTER COLUMN "type_document_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" DROP CONSTRAINT "FK_4c5b503dde2a0bd4fdb54fef54d"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" ADD CONSTRAINT "FK_b5a38e2083bdc908955a72428b2" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ADD CONSTRAINT "FK_5103115855a17fcfe37d203d1fb" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" ADD CONSTRAINT "FK_e8dd2d6421a0affa254757435a4" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" ADD CONSTRAINT "FK_0008147023706fac211a3486987" FOREIGN KEY ("type_document_id") REFERENCES "TasksManagerScheduler_type_documents"("type_document_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" ADD CONSTRAINT "FK_4c5b503dde2a0bd4fdb54fef54d" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" DROP CONSTRAINT "FK_4c5b503dde2a0bd4fdb54fef54d"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" DROP CONSTRAINT "FK_0008147023706fac211a3486987"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" DROP CONSTRAINT "FK_e8dd2d6421a0affa254757435a4"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" DROP CONSTRAINT "FK_5103115855a17fcfe37d203d1fb"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" DROP CONSTRAINT "FK_b5a38e2083bdc908955a72428b2"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" ADD CONSTRAINT "FK_4c5b503dde2a0bd4fdb54fef54d" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" ALTER COLUMN "type_document_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_users" ADD CONSTRAINT "FK_0008147023706fac211a3486987" FOREIGN KEY ("type_document_id") REFERENCES "TasksManagerScheduler_type_documents"("type_document_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" ADD CONSTRAINT "FK_e8dd2d6421a0affa254757435a4" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ADD CONSTRAINT "FK_5103115855a17fcfe37d203d1fb" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" ADD CONSTRAINT "FK_b5a38e2083bdc908955a72428b2" FOREIGN KEY ("user_id") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
