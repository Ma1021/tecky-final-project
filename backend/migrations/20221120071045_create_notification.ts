import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("notification_type", (table)=>{
        table.increments("id");
        table.string("action_type").notNullable();
        table.string("action_desc").notNullable();
    })

    await knex.schema.createTable("notification_object", (table)=>{
        table.increments("id");
        table.integer("notification_type_id").unsigned().notNullable();
        table.foreign("notification_type_id").references("notification_type.id");
        table.integer("notification_target_id").notNullable();
        table.integer("actor_id").unsigned().notNullable();
        table.foreign("actor_id").references("users.id");
        table.timestamps(false, true);
    })

    await knex.schema.createTable("notification", (table)=>{
        table.increments("id");
        table.integer("notification_object_id").unsigned().notNullable();
        table.foreign("notification_object_id").references("notification_object.id");
        table.integer("notifier_id").unsigned().notNullable();
        table.foreign("notifier_id").references("users.id");
        table.boolean("is_read").defaultTo(false);
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("notification");
    await knex.schema.dropTableIfExists("notification_object");
    await knex.schema.dropTableIfExists("notification_type");
}

