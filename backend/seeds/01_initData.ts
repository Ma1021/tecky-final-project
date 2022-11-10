import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("questions").del();
    await knex("users").del();
    await knex("stocks").del();
    await knex("login_method").del();
    await knex("user_type").del();

    // Inserts seed entries
    await knex("user_type").insert([
        { type: "normal" },
        { type: "kol" },
        { type: "admin" }
    ]);

    await knex("stocks").insert([
        { symbol: "QQQ", name: "Invesco QQQ Trust Series 1" },
        { symbol: "VOO", name: "Vanguard 500 Index Fund ETF" },
        { symbol: "AAPL", name: "Apple Inc. (AAPL)"},
        { symbol: "TSLA", name: "Tesla, Inc. (TSLA)"}
    ])

    await knex("users").insert({
        username: "admin",
        email: "admin@gmail.com",
        password_hash: "123",
        user_type_id: 1,
        login_method_id: 1,
    })
};
