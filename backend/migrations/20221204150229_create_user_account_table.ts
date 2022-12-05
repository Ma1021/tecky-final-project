import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_paper_trade_accounts', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').references('users.id');
    table.float('principal');
    table.float('market_value');
    table.float('buying_power');
    table.float('total_profit');
    table.string('account');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_paper_trade_accounts');
}
