import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.alterTable('users', (table) => {
    table.dropColumn('gender');
    table.enu('gender', ['M', 'F']).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable('users', (table) => {
    table.dropColumn('gender');
    table.string('gender').notNullable();
  });
}
