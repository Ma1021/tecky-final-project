import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.alterTable('users', (table) => {
    table.integer('user_type_id').defaultTo(1).alter();
    table
      .text('introduction')
      .defaultTo('此用戶沈迷股市﹐未有容餘更新自我介紹。')
      .alter();
      table.
  });
}

export async function down(knex: Knex): Promise<void> {}
