#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
appDir="$DIR/.."

echo "Installing node modules"
docker run -v "$appDir":/mnt:rw -w /mnt node:9 npm install
docker run -v "$appDir":/mnt:rw -w /mnt node:9 chmod -R 777 node_modules
