import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.integer('user_type_id').nullable().defaultTo(1).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.integer('user_type_id').notNullable().alter();
  });
}

// insert into users (username, email, password_hash, birthday, gender)  VALUES ('testsql', 'testsql@gmail.com', '123456', '2012-09-12', 'M');
