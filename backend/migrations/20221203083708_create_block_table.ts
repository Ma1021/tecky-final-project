import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('block_list', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('blocker').unsigned();
    table.foreign('blocker').references('users.id');
    table.integer('is_blocked').unsigned();
    table.foreign('is_blocked').references('users.id');
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('block_list');
}
