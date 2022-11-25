set -e
set -x

npm i
npm run build
docker build -t stockoverflow-server .