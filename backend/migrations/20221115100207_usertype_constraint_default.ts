import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // knex.schema.alterTable('users', (table) => {
  //   table.dropForeign('user_type_id');
  //   table.dropColumn('user_type_id');
  //   table.integer('user_type_id').unsigned().notNullable().defaultTo(1);
  //   table.foreign('user_type_id').references('user_types.id');
  // });
}

export async function down(knex: Knex): Promise<void> {
  // knex.schema.alterTable('users', (table) => {
  //   table.dropForeign('user_type_id');
  //   table.dropColumn('user_type_id');
  //   table.integer('user_type_id').unsigned().notNullable();
  //   table.foreign('user_type_id').references('user_types.id');
  // });
}

// insert into users (username, email, password_hash, birthday, gender)  VALUES ('testsql', 'testsql@gmail.com', '123456', '2012-09-12', 'M');
