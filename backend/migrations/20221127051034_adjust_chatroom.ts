import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chatrooms', (table) => {
    table
      .string('introduction')
      .defaultTo('未有介紹, 快手加入一探究竟')
      .alter();
  });
  await knex.schema.alterTable('chatroom_user', (table) => {
    table.boolean('is_ban').defaultTo(false);
  });

  await knex.schema.alterTable('chatroom_record', (table) => {
    table.timestamps(false, true);
    table.boolean('is_deleted').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chatrooms', (table) => {
    table.string('introduction').alter();
  });
  await knex.schema.alterTable('chatroom_user', (table) => {
    table.dropColumn('is_ban');
  });

  await knex.schema.alterTable('chatroom_record', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('is_deleted');
  });
}
