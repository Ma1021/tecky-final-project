import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', async (table) => {
    await knex.raw(`Create type gender_type as enum ('M', 'F');`);
    await knex.raw(
      `alter table users alter column gender type gender_type USING gender::gender_type;`,
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', async (table) => {
    await knex.raw(`alter table users alter column gender type varchar(255);`);
  });
  await knex.schema.raw('drop type gender_type;');
}
