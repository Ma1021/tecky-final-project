import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('user_type_id');
    table.enu('user_type', ['normal', 'admin', 'kol']).defaultTo('normal');
  });
  await knex.schema.dropTable('user_types');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_types', (table) => {
    table.increments('id');
    table.string('type').notNullable().unique();
  });
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('user_type_id');
    table.integer('user_type_id').unsigned().notNullable();
    table.foreign('user_type_id').references('user_types.id');
  });
}
