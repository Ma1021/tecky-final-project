import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  PORT: 8080,
  DB_NAME: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  NODE_ENV: "development",
};

populateEnv(env, { mode: "halt" });
