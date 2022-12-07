import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_paper_trade_accounts', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.float('market_value');
    table.float('buying_power');
    table.string('account');
  });

  await knex.schema.createTable('trade_records', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.string('symbol').references('stock_info.symbol');
    table.float('order_price');
    table.integer('quantity');
    table.float('order_market_value');
    table.timestamp('order_place_time').defaultTo(knex.fn.now());
    table.integer('order_status');
    table.timestamp('order_complete_time').defaultTo(knex.fn.now());
    table.string('account');
  });

  await knex.schema.createTable('user_cryptos', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.string('symbol');
    table.string('name');
    table.string('chinese_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_paper_trade_accounts');
  await knex.schema.dropTableIfExists('trade_records');
  await knex.schema.dropTableIfExists('user_cryptos');
}
