import { Migration } from '@mikro-orm/migrations'

export class Migration20220216023844 extends Migration {
	async up(): Promise<void> {
		this.addSql('drop table if exists "posts" cascade;')

		this.addSql('alter table "player" add column "age" int not null;')
	}

	async down(): Promise<void> {
		this.addSql('create table "posts" ("id" serial primary key, "name" varchar not null default null);')

		this.addSql('alter table "player" drop column "age";')
	}
}
