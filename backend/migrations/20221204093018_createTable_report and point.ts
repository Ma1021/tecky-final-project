import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_points', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.string('event').notNullable();
    table.integer('event_id').notNullable();
    table.integer('point').defaultTo(0);
    table.timestamps(false, true);
  });
  
  await knex.schema.createTable('reports', (table) => {
    table.increments('id', { primaryKey: true });
    table.integer('from_user_id').unsigned().notNullable();
    table.foreign('from_user_id').references('users.id');
    table.integer('to_user_id').unsigned().notNullable();
    table.foreign('to_user_id').references('users.id');
    table.string('reason').notNullable();
    table.string('target_type').notNullable();
    table.integer('target_id');
    table.boolean('is_confirmed').defaultTo(false);
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_points');
  await knex.schema.dropTableIfExists('reports');
}

