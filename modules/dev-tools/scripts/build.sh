#!/bin/bash

set -e

DEV_TOOLS_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`
CONFIG=`node $DEV_TOOLS_DIR/node/get-config.js ".babel.configPath"`

check_target() {
  if [[ ! "$1" =~ ^es5|es6|esm ]]; then
    echo -e "\033[91mUnknown build target $1. ocular-build [--dist es5|es6|esm,...] [module1,...]\033[0m"
    exit 1
  fi
}

build_module() {
  if [ -z "$1" ]; then
    TARGETS="es6 esm es5"
  else
    TARGETS=$*
  fi
  N=`echo "$TARGETS" | wc -w`
  if [ $N -eq 1 ]; then
    check_target $TARGETS
    BABEL_ENV=$TARGETS npx babel src --config-file $CONFIG --out-dir dist --source-maps
  else
    for T in ${TARGETS}; do(
      check_target $T
      BABEL_ENV=$T npx babel src --config-file $CONFIG --out-dir dist/$T --source-maps
    ); done
  fi
}

build_unirepo() {
  build_module
}

build_monorepo() {
  MODULES=""

  while [ -n "$1" ]; do
    if [[ "$1" =~ ^\-\-[A-Za-z]+ ]]; then
      case "$1" in
        --dist)
            TARGET=$2
            shift ;;
        *)
            echo -e "\033[91mUnknown option $1. ocular-build [--dist es5|es6|esm,...] [module1,...]\033[0m"
            exit 1 ;;
      esac
    else
      # Build selected modules
      # build.sh MODULE1,MODULE2
      MODULES=`echo $1 | sed -e 's/,/ /g'`
    fi
    shift
  done

  cd modules

  if [ -z "$MODULES" ]; then
    # Build all modules
    MODULES=`ls`
  fi

  for D in ${MODULES}; do (
    if [ -e "${D}/package.json" ]; then
      echo -e "\033[1mBuilding modules/$D\033[0m"
      cd $D
      build_module `echo $TARGET | sed -e 's/,/ /g'`
      echo ""
    fi
  ); done
}

if [ -d "modules" ]; then
  build_monorepo $*
else
  build_unirepo
fi
