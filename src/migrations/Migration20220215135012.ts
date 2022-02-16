import { Migration } from '@mikro-orm/migrations'

export class Migration20220215135012 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "player" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
		)
		this.addSql('alter table "player" add constraint "player_pkey" primary key ("id");')
	}
}
