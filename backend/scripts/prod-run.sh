#!/bin/bash
set -e
set -o pipefail
cd dist
npx knex migrate:latest --env production
cd ../
node dist/src/main.js