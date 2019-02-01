#!/bin/sh

set -e

build_module() {
  CONFIG=$1

  BABEL_ENV=es6 npx babel src --config-file $CONFIG --out-dir dist/es6 --source-maps
  BABEL_ENV=esm npx babel src --config-file $CONFIG --out-dir dist/esm --source-maps
  BABEL_ENV=es5 npx babel src --config-file $CONFIG --out-dir dist/es5 --source-maps
}

if [ -d "modules" ]; then
  # monorepo
  cd modules
  for D in *; do (
    echo "\033[1mBuilding modules/$D\033[0m"
    cd $D
    build_module ../../babel.config.js
    echo ""
  ); done
else
  build_module ./babel.config.js
fi
