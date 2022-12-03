import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('questions', (table) => {
    table.boolean('is_ban').defaultTo(false);
    table.boolean('is_reported').defaultTo(false);
  });

  await knex.schema.alterTable('answers', (table)=>{
    table.boolean('is_reported').defaultTo(false);
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('questions', (table) => {
    table.dropColumn('is_ban');
    table.dropColumn('is_reported');
  });

  await knex.schema.alterTable('answers', (table)=>{
    table.dropColumn('is_reported');
  })
}



