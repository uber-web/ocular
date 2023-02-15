#!/bin/bash

set -e
# set -x # uncomment to debug

clean() {
  if [ -z "$1" ]; then
    rm -fr dist && mkdir -p dist
  elif [ "$1" = "all" ]; then
    rm -fr dist
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

find . -name tsconfig.tsbuildinfo -exec rm {} \;
