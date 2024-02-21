#!/bin/bash

set -e

DEV_TOOLS_DIR=$(dirname $0)/..
CONFIG=`ts-node $DEV_TOOLS_DIR/src/helpers/get-config.js ".babel.configPath"`
MODULES=`ts-node $DEV_TOOLS_DIR/src/helpers/get-config.js ".modules" | sed -E "s/,/ /g"`
EXTENSIONS=`ts-node $DEV_TOOLS_DIR/src/helpers/get-config.js ".babel.extensions"`
TS_PROJECT=`ts-node $DEV_TOOLS_DIR/src/helpers/get-config.js ".typescript.project"`
IS_ESM=`ts-node $DEV_TOOLS_DIR/src/helpers/get-config.js ".esm"`

check_target() {
  if [[ ! "$1" =~ ^es5|esm ]]; then
    echo -e "\033[91mUnknown build target $1. ocular-build [--dist es5|esm,...] [module1,...]\033[0m"
    exit 1
  fi
}

build_src() {
  OUT_DIR=$1
  TARGET=$2
  check_target $TARGET

  if [ ! -z "$CONFIG" ]; then
    (set -x; BABEL_ENV=$TARGET npx babel src --config-file $CONFIG --out-dir $OUT_DIR --copy-files --source-maps --extensions $EXTENSIONS)
  fi
}

build_module_esm() {
  build_src dist esm-strict
  ts-node $DEV_TOOLS_DIR/src/build-cjs.js
}

build_module() {
  if [ -z "$1" ]; then
    TARGETS="esm es5"
  else
    TARGETS=$*
  fi
  N=`echo "$TARGETS" | wc -w`
  if [ $N -eq 1 ]; then
    build_src dist $TARGETS
  else
    for T in ${TARGETS}; do(
       build_src dist/$T $T
    ); done
  fi
}

build_unirepo() {
  if [ "$IS_ESM" = "true" ]; then
    build_module_esm
  else
    build_module
  fi
}

build_monorepo() {
  while [ -n "$1" ]; do
    if [[ "$1" =~ ^\-\-[A-Za-z]+ ]]; then
      case "$1" in
        --dist)
            TARGET=$2
            shift ;;
        *)
            echo -e "\033[91mUnknown option $1. ocular-build [--dist es5|esm,...] [module1,...]\033[0m"
            exit 1 ;;
      esac
    else
      # Build selected modules
      # build.sh MODULE1,MODULE2
      MODULES=`echo $1 | sed -e 's/,/ modules\//g' | sed -e 's/^/modules\//g'`
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
      if [ "$IS_ESM" = "true" ]; then
        build_module_esm
      else
        build_module `echo $TARGET | sed -e 's/,/ /g'`
      fi
      echo ""
    elif [ ! -e "${D}" ]; then
      echo -e "\033[1mWarning: skipping $D because it doesn't match any file.\033[0m"
      echo -e "\033[1mHint: modules must be specified using full path relative to the project root.\033[0m"
      echo ""
    fi
  ); done
}

if [ ! -z "$TS_PROJECT" ]; then
  tspc -b $TS_PROJECT --verbose
fi

if [ -d "modules" ]; then
  build_monorepo $*
else
  build_unirepo
fi
