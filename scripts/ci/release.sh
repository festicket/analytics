#! /bin/bash

set -ex

REVISION=$(git rev-parse HEAD)

# Source all our environment setup
export $(cat ./scripts/ci/.env | grep -v ^# | xargs)

# Run the setup script
# This means the docker container will be available to the node running the release job
. ./scripts/ci/setup.sh

# Clean our local env
rm -rf dist
mkdir dist

# Copy the assets out of the docker container
docker run -it --rm \
  --user root \
  -v $(pwd):/mnt/assets \
  $CONTAINER_NAME:$REVISION \
  cp -r dist/ /mnt/assets


# Release the krakken
npx semantic-release
