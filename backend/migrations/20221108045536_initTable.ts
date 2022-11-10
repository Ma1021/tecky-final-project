import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("user_type", (table)=>{
        table.increments("id");
        table.string("type").notNullable().unique();
    })
    
    await knex.schema.createTable("users", (table)=>{
        table.increments("id");
        table.string("username").notNullable();
        table.string("email").notNullable().unique();
        table.string("password_hash").notNullable().unique();
        table.integer("user_type_id").unsigned().notNullable();
        table.foreign("user_type_id").references("user_type.id");
        table.string("avatar");
        table.text("introduction");
        table.dateTime("last_login");
        table.date("birthday").notNullable();
        table.string("gender").notNullable();
        table.timestamps(false, true);
    })

    await knex.schema.createTable("stocks", (table)=>{
        table.increments("id");
        table.string("symbol").notNullable().unique();
        table.string("name").notNullable().unique();
        table.timestamps(false, true);
    })

    await knex.schema.createTable("tag", (table)=> {
        table.increments("id");
        table.integer("tag_id").notNullable();
        table.integer("stock_id").unsigned().notNullable();
        table.foreign("stock_id").references("stocks.id");
    })

    await knex.schema.createTable("questions", (table)=>{
        table.increments("id");
        table.integer("asker_id").unsigned().notNullable();
        table.foreign("asker_id").references("users.id");
        table.string("content").notNullable();
        table.integer("tag_id").notNullable();
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("questions");
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("stocks");
    await knex.schema.dropTableIfExists("user_type");
}

