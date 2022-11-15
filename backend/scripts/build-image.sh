set -e
set -x

npm i
npm run build
docker build -t docker_image2 .
