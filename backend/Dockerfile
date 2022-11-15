FROM node:16-slim
workdir /usr/src/server

copy package.json .
run npm install --omit=dev

copy dist dist

copy scripts/prod-run.sh scripts/

cmd bash scripts/prod-run.sh