import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("subscriptions", (table)=>{
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("following_id").unsigned().notNullable();
        table.foreign("following_id").references("users.id");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("subscriptions");
}

