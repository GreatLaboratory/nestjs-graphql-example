import { Migration } from '@mikro-orm/migrations';

export class Migration20220221140230 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "team" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "team" add constraint "team_pkey" primary key ("id");');

    this.addSql('create table "player" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "age" int not null, "team_id" uuid null);');
    this.addSql('alter table "player" add constraint "player_pkey" primary key ("id");');

    this.addSql('create table "person" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null);');
    this.addSql('alter table "person" add constraint "person_pkey" primary key ("id");');

    this.addSql('alter table "player" add constraint "player_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade on delete set null;');
  }

}
