const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class NewMigration1681943690462 {
    name = 'NewMigration1681943690462'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "Video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL DEFAULT '', "flags" text array NOT NULL DEFAULT ARRAY['isPublic'], "views" integer NOT NULL DEFAULT '0', "likes" integer NOT NULL DEFAULT '0', "duration" integer NOT NULL DEFAULT '0', "description" text NOT NULL DEFAULT '', "video_path" character varying NOT NULL DEFAULT '', "thumbnail_path" character varying NOT NULL DEFAULT '', "user_id" uuid NOT NULL, CONSTRAINT "PK_2a23c3da7a2fc570b1696191b87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "from_user_id" uuid NOT NULL, "to_channel_id" uuid NOT NULL, CONSTRAINT "PK_eb0d69496fa84cd24da9fc78edd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "from_user_id" uuid NOT NULL, "to_video_id" uuid NOT NULL, CONSTRAINT "PK_20ede1755cb694ecf15674c8ba1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying DEFAULT '', "password" character varying NOT NULL, "username" character varying NOT NULL DEFAULT '', "flags" text array NOT NULL DEFAULT ARRAY['registered'], "subscribers_count" integer NOT NULL DEFAULT '0', "description" text NOT NULL DEFAULT '', "avatar_path" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "message" text NOT NULL, "video_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_fe8d6bf0fcb531dfa75f3fd5bdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Video" ADD CONSTRAINT "FK_287e5cf7671bef66254834de3fb" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Subscription" ADD CONSTRAINT "FK_866db7d4e7afeb1b4f8e1db28cb" FOREIGN KEY ("from_user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Subscription" ADD CONSTRAINT "FK_fce052ef48d963016e16e43e6ec" FOREIGN KEY ("to_channel_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_116acc50657a08886928d5269d6" FOREIGN KEY ("from_user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_6c7de771ed37d3278fa6dd2ea21" FOREIGN KEY ("to_video_id") REFERENCES "Video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_35807048116cf822fd0ef9c0299" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_ee3208e6011f580f1022169a56b" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_ee3208e6011f580f1022169a56b"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_35807048116cf822fd0ef9c0299"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_6c7de771ed37d3278fa6dd2ea21"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_116acc50657a08886928d5269d6"`);
        await queryRunner.query(`ALTER TABLE "Subscription" DROP CONSTRAINT "FK_fce052ef48d963016e16e43e6ec"`);
        await queryRunner.query(`ALTER TABLE "Subscription" DROP CONSTRAINT "FK_866db7d4e7afeb1b4f8e1db28cb"`);
        await queryRunner.query(`ALTER TABLE "Video" DROP CONSTRAINT "FK_287e5cf7671bef66254834de3fb"`);
        await queryRunner.query(`DROP TABLE "Comment"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Like"`);
        await queryRunner.query(`DROP TABLE "Subscription"`);
        await queryRunner.query(`DROP TABLE "Video"`);
    }
}
