import { config } from 'dotenv';
import populateEnv from 'populate-env';

config();

export const env = {
  PORT: 8080,
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  NODE_ENV: 'development',
  DB_HOST: '',
  DB_PORT: 5432,
  AWS_ACCESS_KEY_ID: '',
  AWS_SECRET_ACCESS_KEY: '',
  S3_BUCKET_NAME: '',
  S3_REGION: '',
  FIREBASE_KEY: ''
};

populateEnv(env, { mode: 'halt' });
console.log(env);
