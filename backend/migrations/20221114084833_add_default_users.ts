import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.integer('user_type_id').defaultTo(1).alter();
    table
      .text('introduction')
      .defaultTo('此用戶沉迷股市﹐未有容餘更新自我介紹。')
      .alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.integer('user_type_id').alter();
    table.text('introduction').alter();
  });
}
