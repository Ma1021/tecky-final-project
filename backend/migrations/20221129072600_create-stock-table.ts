import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('stock_info', (table) => {
    table.increments('id', { primaryKey: true });
    table.string('symbol').unique();
    table.string('name');
    table.string('chinese_name');
    table.float('current_price');
    table.float('yesterday_price');
  });

  await knex.schema.createTable('user_stocks', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.string('symbol').references('stock_info.symbol');
  });

  await knex.schema.createTable('user_trades', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.string('symbol').references('stock_info.symbol');
    table.boolean('long');
    table.float('order_price');
    table.integer('quantity');
    table.timestamp('order_place_time');
    table.integer('order_status');
    table.timestamp('order_complete_time');
    table.string('account');
  });

  await knex.schema.createTable('stock_news', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('stock_id').references('stock_info.id');
    table.text('title');
    table.text('content');
    table.timestamp('time');
    table.text('hyperlink');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('stock_news');
  await knex.schema.dropTableIfExists('user_trades');
  await knex.schema.dropTableIfExists('user_stocks');
  await knex.schema.dropTableIfExists('stock_info');
}
