import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {    
    await knex.schema.createTable("users", (table)=>{
        table.increments("id");
        table.string("username").notNullable();
        table.string("email").notNullable().unique();
        table.string("password_hash").notNullable().unique();
        table.enu('user_type', ['normal', 'admin', 'kol']).defaultTo('normal');
        table.text("avatar").defaultTo('https://cdn5.vectorstock.com/i/1000x1000/54/19/gray-wolf-cartoon-wolf-grey-the-nature-vector-20325419.jpg');
        table.text("introduction").defaultTo('此用戶沉迷股市﹐未有容餘更新自我介紹。');
        table.date("birthday").notNullable();
        table.enu("gender", ["M", "F"]);
        table.timestamps(false, true);
    })

    await knex.schema.createTable("stocks", (table)=>{
        table.increments("id");
        table.string("symbol").notNullable().unique();
        table.string("name").notNullable().unique();
        table.timestamps(false, true);
    })

    await knex.schema.createTable("tags", (table)=> {
        table.increments("id");
        table.integer("tag_id").notNullable();
        table.integer("stock_id").unsigned();
        table.foreign("stock_id").references("stocks.id");
    })

    await knex.schema.createTable("questions", (table)=>{
        table.increments("id");
        table.integer("asker_id").unsigned().notNullable();
        table.foreign("asker_id").references("users.id");
        table.string("content", 100).notNullable();
        table.integer("tag_id").notNullable();
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("questions");
    await knex.schema.dropTableIfExists("tags");
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("stocks");
}

