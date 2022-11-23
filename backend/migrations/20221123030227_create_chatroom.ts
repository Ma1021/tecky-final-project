import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('chatrooms', (table) => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.integer('host').unsigned().notNullable();
    table.foreign('host').references('users.id');
    table.enu('type', ['public', 'private']).defaultTo('public');
    table.timestamps(false, true);
  });

  await knex.schema.createTable('chatroom_user', (table) => {
    table.increments('id').primary();
    table.integer('member').unsigned().notNullable();
    table.foreign('member').references('users.id');
    table
      .enu('status', ['approved', 'pending', 'declined'])
      .defaultTo('pending');
    table.integer('chatroom').unsigned().notNullable();
    table.foreign('chatroom').references('chatrooms.id');
    table.timestamps(false, true);
  });

  await knex.schema.createTable('chatroom_record', (table) => {
    table.increments('id').primary();
    table.integer('chatroom').unsigned().notNullable();
    table.foreign('chatroom').references('chatrooms.id');
    table.integer('user').unsigned().notNullable();
    table.foreign('user').references('users.id');
    table.string('record').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchema('chatrooms');
  await knex.schema.dropSchema('chatroom_user');
  await knex.schema.dropSchema('chatroom_record');
}
