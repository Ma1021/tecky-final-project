FROM node:16-slim
workdir /usr/src/server

copy package.json .
run npm install --omit=dev

# copy <loacl file> <container dir>
copy dist dist
copy data dist/data

copy scripts/prod-run.sh scripts/

cmd bash scripts/prod-run.sh