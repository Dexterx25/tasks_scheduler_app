import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719083660249 implements MigrationInterface {
    name = 'Migration1719083660249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_auth" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "auth_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "access_token" character varying(250) NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "userIdUserId" uuid, CONSTRAINT "REL_86ee12bcf11b6a9bdfe1502d63" UNIQUE ("userIdUserId"), CONSTRAINT "PK_ba7ab90288d49111b966fb389ef" PRIMARY KEY ("auth_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_type_documents" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type_document_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "userIdUserId" uuid, CONSTRAINT "PK_0b94067c5de9fcfd0c2906b7d18" PRIMARY KEY ("type_document_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_roles" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(250) NOT NULL, CONSTRAINT "PK_63c8d2b9f800849c97565041bea" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_roles_users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user" uuid NOT NULL, "role_id" uuid NOT NULL, "userUserId" uuid, "roleIdRoleId" uuid, CONSTRAINT "PK_f6d97961e0f7748b1d87239bb3a" PRIMARY KEY ("user", "role_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_auth_refresh" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "auth_refresh_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refresh_token" character varying(250) NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "userIdUserId" uuid, CONSTRAINT "REL_53b78d76c5a70dec73cd4a6d7a" UNIQUE ("userIdUserId"), CONSTRAINT "PK_b118d2c3bd7a7aec26cd083b02b" PRIMARY KEY ("auth_refresh_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_passwords" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "password_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying(250) NOT NULL, "salt" character varying(250) NOT NULL, "is_vigent" boolean NOT NULL, "userIdUserId" uuid, CONSTRAINT "PK_a5a6d04895121ea5bf2875f7a6a" PRIMARY KEY ("password_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "names" character varying(100) NOT NULL, "surnames" character varying(100) NOT NULL, "nikname" character varying(200) NOT NULL, CONSTRAINT "PK_8ce0107dd05e6687244f5af3bbd" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "TasksManagerScheduler_user_details" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user_detail_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "cell_phone" integer NOT NULL, "direction" character varying(100) NOT NULL DEFAULT '', "summary" character varying(100) NOT NULL DEFAULT '', "date_birthday" TIMESTAMP NOT NULL, "userIdUserId" uuid, CONSTRAINT "PK_c238c28ea815013b9016c40224a" PRIMARY KEY ("user_detail_id"))`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" ADD CONSTRAINT "FK_86ee12bcf11b6a9bdfe1502d631" FOREIGN KEY ("userIdUserId") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_type_documents" ADD CONSTRAINT "FK_c87392bd00dd3d6ecb86922558c" FOREIGN KEY ("userIdUserId") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_roles_users" ADD CONSTRAINT "FK_8f5ca6ea5afc72d411405160dcc" FOREIGN KEY ("userUserId") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_roles_users" ADD CONSTRAINT "FK_004432ed82b1e509722fef6016e" FOREIGN KEY ("roleIdRoleId") REFERENCES "TasksManagerScheduler_roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" ADD CONSTRAINT "FK_53b78d76c5a70dec73cd4a6d7a9" FOREIGN KEY ("userIdUserId") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" ADD CONSTRAINT "FK_2fea2838d514169d1a024a940fd" FOREIGN KEY ("userIdUserId") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" ADD CONSTRAINT "FK_d3f6737f28a01660e4af3b0afde" FOREIGN KEY ("userIdUserId") REFERENCES "TasksManagerScheduler_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_user_details" DROP CONSTRAINT "FK_d3f6737f28a01660e4af3b0afde"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_passwords" DROP CONSTRAINT "FK_2fea2838d514169d1a024a940fd"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth_refresh" DROP CONSTRAINT "FK_53b78d76c5a70dec73cd4a6d7a9"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_roles_users" DROP CONSTRAINT "FK_004432ed82b1e509722fef6016e"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_roles_users" DROP CONSTRAINT "FK_8f5ca6ea5afc72d411405160dcc"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_type_documents" DROP CONSTRAINT "FK_c87392bd00dd3d6ecb86922558c"`);
        await queryRunner.query(`ALTER TABLE "TasksManagerScheduler_auth" DROP CONSTRAINT "FK_86ee12bcf11b6a9bdfe1502d631"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_user_details"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_users"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_passwords"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_auth_refresh"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_roles_users"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_roles"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_type_documents"`);
        await queryRunner.query(`DROP TABLE "TasksManagerScheduler_auth"`);
    }

}
