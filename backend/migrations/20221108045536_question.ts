import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("user_type", (table)=>{
        table.increments("id");
        table.string("type").notNullable().unique();
    })

    await knex.schema.createTable("login_method", (table)=>{
        table.increments("id");
        table.string("method").notNullable().unique();
    })
    
    await knex.schema.createTable("users", (table)=>{
        table.increments("id");
        table.string("username").notNullable();
        table.string("email").notNullable().unique();
        table.string("password_hash").notNullable().unique();
        table.integer("user_type_id").unsigned();
        table.foreign("user_type_id").references("user_type.id");
        table.integer("login_method_id").unsigned();
        table.foreign("login_method_id").references("login_method.id");
        table.string("avatar");
        table.text("introduction");
        table.dateTime("last_login");
        table.date("birthday");
        table.timestamps(false, true);
    })

    await knex.schema.createTable("stocks", (table)=>{
        table.increments("id");
        table.string("symbol");
    })
    
    await knex.schema.createTable("questions", (table)=>{
        table.increments("id");
        table.integer("asker_id").unsigned().notNullable();
        table.foreign("asker_id").references("users.id");
        table.string("content").notNullable();
        table.integer("tag_id").unsigned();
        table.foreign("tag_id").references("stock.id");
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("questions");
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("login_method");
    await knex.schema.dropTableIfExists("user_type");
}

