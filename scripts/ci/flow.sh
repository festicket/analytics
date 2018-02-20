#! /bin/bash

set -ex

REVISION=$(git rev-parse HEAD)

# Source all our environment setup
export $(cat ./scripts/ci/.env | grep -v ^# | xargs)

docker run -it --rm \
  $CONTAINER_NAME:$REVISION \
  npm run flow
