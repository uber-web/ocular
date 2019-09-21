#!/bin/bash

set -e

clean() {
  if [ -z "$1" ]; then
    rm -fr dist && mkdir -p dist/es5 dist/esm dist/es6
  elif [ "$1" = "-a" ]; then
    rm -fr dist
  else
    echo "Option $1 not recognized."
    exit 1
  fi
}

if [ -d "modules" ]; then
  # Monorepo
  cd modules

  for D in *; do (
    cd $D
    clean $1
  ); done
else
  clean $1
fi
