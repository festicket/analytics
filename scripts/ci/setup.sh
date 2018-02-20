#! /bin/bash

set -ex

REVISION=$(git rev-parse HEAD)

# Clean up semaphore
# sudo rm -rf /home/runner/{.phpbrew,.phpunit,.kerl,.kiex,.lein,.rbenv}

# Source all our environment setup
export $(cat ./scripts/ci/.env | grep -v ^# | xargs)

docker build . \
  -f ./docker/base-image/Dockerfile \
  -t $CONTAINER_NAME:$REVISION

