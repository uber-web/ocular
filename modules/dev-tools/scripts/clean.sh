#!/bin/bash

set -e

clean() {
  if [ -z "$1" ]; then
    (set -x; rm -fr dist && mkdir -p dist/es5 dist/esm)
  elif [ "$1" = "all" ]; then
    (set -x; rm -fr dist)
  else
    echo -e "\033[91mUnknown option $1. ocular-clean [all]\033[0m"
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
