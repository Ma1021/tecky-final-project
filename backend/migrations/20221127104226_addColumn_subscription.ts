import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('subscriptions', (table) => {
        table.boolean('is_deleted').defaultTo(false);
        table.date('created_at');
        table.date('updated_at');
        table.string('category').defaultTo('關注');
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('subscriptions', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('is_deleted');
    table.dropColumn('category');
  });
}

