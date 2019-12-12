#!/bin/bash

set -e

DEV_TOOLS_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`
CONFIG=`node $DEV_TOOLS_DIR/node/get-config.js ".babel.configPath"`
MODULES=`node $DEV_TOOLS_DIR/node/get-config.js ".modules" | jq -r 'join(" ")'`

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
    BABEL_ENV=$TARGETS npx babel src --config-file $CONFIG --out-dir dist --copy-files --source-maps
  else
    for T in ${TARGETS}; do(
      check_target $T
      BABEL_ENV=$T npx babel src --config-file $CONFIG --out-dir dist/$T --copy-files --source-maps
    ); done
  fi
}

build_unirepo() {
  build_module
}

build_monorepo() {
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

  if [ -z "$MODULES" ]; then
    # Build all modules
    MODULES=`find modules -mindepth 1 -maxdepth 1 -not \( -name ".*" \)`
  fi

  for D in ${MODULES}; do (
    if [ -e "${D}/package.json" ]; then
      echo -e "\033[1mBuilding $D\033[0m"
      cd $D
      build_module `echo $TARGET | sed -e 's/,/ /g'`
      echo ""
    elif [ ! -e "${D}" ]; then
      echo -e "\033[1mWarning: skipping $D because it doesn't match any file.\033[0m"
      echo -e "\033[1mHint: modules must be specified using full path relative to the project root.\033[0m"
      echo ""
    fi
  ); done
}

if [ -d "modules" ]; then
  build_monorepo $*
else
  build_unirepo
fi
