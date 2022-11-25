set -e
set -x

# variable of ec2 server
server="stockoverflow"

./scripts/build-image.sh

docker images stockoverflow-server:latest

## Export and Upload Image in one pass
# docker save stockoverflow-server:latest \
#   | pv \
#   | zstd \
# 	| ssh $server "
# 	  unzstd | docker load
# 	"

## Export image, then upload with rsync to allow skipping if the image is unchanged
docker save stockoverflow-server:latest | zstd > image.zst
# rsync -SavLP image.zst $server:~/stockoverflow/
ssh $server "
  cd stockoverflow && \
  cat image.zst | unzstd | docker load
"

rsync -SavLP docker-compose.yml $server:~/stockoverflow/
ssh $server "
  cd stockoverflow && \
  docker-compose up -d
"