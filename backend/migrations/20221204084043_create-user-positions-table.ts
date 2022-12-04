import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_positions', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.string('symbol').references('stock_info.symbol');
    table.boolean('long');
    table.decimal('cost');
    table.decimal('current_price');
    table.integer('quantity');
    table.string('account');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_positions');
}
