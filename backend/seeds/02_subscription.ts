import { Kinesis } from 'aws-sdk';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('subscriptions').del();

  // Inserts seed entries
  //Insert subscriptions
  for (let x = 1; x < 12; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 5,
    });
  }

  for (let x = 1; x < 10; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 6,
    });
  }

  for (let x = 1; x < 9; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 8,
    });
  }

  for (let x = 1; x < 7; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 9,
    });
  }

  for (let x = 1; x < 5; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 10,
    });
  }

  for (let x = 1; x < 4; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 11,
    });
  }

  for (let x = 1; x < 3; x++) {
    await knex('subscriptions').insert({
      user_id: x,
      following_id: 7,
    });
  }
}
