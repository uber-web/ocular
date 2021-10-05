#!/bin/bash
# Script to bootstrap repo for development

set -e

# install dependencies
yarn global add puppeteer
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn

# prepare module directories
PACKAGE_DIR=`pwd`
ROOT_NODE_MODULES_DIR=$PACKAGE_DIR/node_modules

if [ -d "modules" ]; then
  # monorepo
  cd modules
  for D in *; do (
    [ -d $D ]
    cd $D

    # create symlink to dev dependencies at root
    # this is a bug of yarn: https://github.com/yarnpkg/yarn/issues/4964
    # TODO - remove when fixed
    mkdir -p node_modules
    rm -rf ./node_modules/.bin
    ln -sf $ROOT_NODE_MODULES_DIR/.bin ./node_modules
  ); done

  cd $PACKAGE_DIR
fi

# build the submodules
npm run build
