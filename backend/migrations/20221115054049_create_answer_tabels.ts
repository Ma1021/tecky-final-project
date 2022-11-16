import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("answers", (table) => {
        table.increments("id");
        table.integer("question_id").unsigned().notNullable();
        table.foreign("question_id").references("questions.id");
        table.integer("answerer_id").unsigned().notNullable();
        table.foreign("answerer_id").references("users.id");
        table.string("content").notNullable();
        table.boolean("is_ban").defaultTo("false");
        table.timestamps(false, true);
    });

    await knex.schema.createTable("ans_likes", (table)=> {
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("answer_id").unsigned().notNullable();
        table.foreign("answer_id").references("answers.id");
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('ans_likes');
  await knex.schema.dropTableIfExists('answers');
}
