#!/bin/sh

set -e

clean() {
  rm -fr dist && mkdir -p dist/es5 dist/esm dist/es6
}

if [ -d "modules" ]; then
  # Monorepo
  cd modules

  for D in *; do (
    cd $D
    clean
  ); done
else
  clean
fi
