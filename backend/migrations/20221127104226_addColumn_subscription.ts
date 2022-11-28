import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('subscriptions', (table) => {
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('subscriptions', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('is_deleted');
  });
}

