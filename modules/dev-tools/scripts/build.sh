#!/bin/sh

set -e

build_module() {
  CONFIG=$1

  BABEL_ENV=es6 npx babel src --config-file $CONFIG --out-dir dist/es6 --source-maps
  BABEL_ENV=esm npx babel src --config-file $CONFIG --out-dir dist/esm --source-maps
  BABEL_ENV=es5 npx babel src --config-file $CONFIG --out-dir dist/es5 --source-maps
}

build_unirepo() {
  build_module ./babel.config.js
}

build_monorepo() {
  cd modules

  if [ -z "$1" ]; then
    # Build all modules
    MODULES=(*)
  else
    # Build selected modules
    # build.sh MODULE1,MODULE2
    IFS=',' read -r -a MODULES <<< "$1"
  fi

  for D in "${MODULES[@]}"; do (
    echo "\033[1mBuilding modules/$D\033[0m"
    cd $D
    build_module ../../babel.config.js
    echo ""
  ); done
}

if [ -d "modules" ]; then
  build_monorepo $1
else
  build_unirepo
fi
