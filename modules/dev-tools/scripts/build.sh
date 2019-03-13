#!/bin/bash

set -e

DEV_TOOLS_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`
CONFIG=`$DEV_TOOLS_DIR/scripts/print-config.sh ".babel.configPath"`

build_module() {
  BABEL_ENV=es6 npx babel src --config-file $CONFIG --out-dir dist/es6 --source-maps
  BABEL_ENV=esm npx babel src --config-file $CONFIG --out-dir dist/esm --source-maps
  BABEL_ENV=es5 npx babel src --config-file $CONFIG --out-dir dist/es5 --source-maps
}

build_unirepo() {
  build_module
}

build_monorepo() {
  cd modules

  if [ -z "$1" ]; then
    # Build all modules
    MODULES=`ls`
  else
    # Build selected modules
    # build.sh MODULE1,MODULE2
    MODULES=`echo $1 | sed -e 's/,/ /g'`
  fi

  for D in ${MODULES}; do (
    echo -e "\033[1mBuilding modules/$D\033[0m"
    cd $D
    build_module
    echo ""
  ); done
}

if [ -d "modules" ]; then
  build_monorepo $1
else
  build_unirepo
fi
