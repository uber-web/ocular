#!/bin/bash
# Script to collect build size information

# set -ex

export PATH=$PATH:node_modules/.bin

DEV_TOOLS_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`
WORKING_DIR=`pwd`
TMP_DIR=$WORKING_DIR/tmp

# Get webpack config path
WEBPACK_CONFIG=`node $DEV_TOOLS_DIR/node/get-config.js ".webpack.configPath"`

# Get name from package.json
module=$(jq '.name' ./package.json)
# Get version
if [ -d "modules" ]; then
  # Use lerna version if monorepo
  packageInfo=./lerna.json
else
  # Use package.json version if monorepo
  packageInfo=./package.json
fi
# Get version from packag.json and remove quotes
version=$(jq -r '.version' $packageInfo)

# Helper functions

print_size_header() {
  echo -e "\033[1m| Version        | Dist | Bundle Size      | Compressed     | Imports   |\033[0m"
  echo "| ---            | ---  | ---              | ---            | ---       |"
}

print_size() {
  DIST=$1
  cd $TMP_DIR

  for f in *; do (
    # Size it
    size=$(wc -c $f | awk '{ print int($1 / 1024) "KB (" $1 ")" }')
    # Zip it
    gzip -9f $f
    # Size it again
    zipsize=$(wc -c $f.gz | awk '{ print int($1 / 1024) "KB (" $1 ")" }')  # Size it
    # Remove our copy
    rm $f.gz
    # Print version, size, compressed size with markdown

    echo "| $version | $DIST  | $size KB  | $zipsize KB     | $f "
  ); done

  cd $WORKING_DIR
}

build_bundle() {
  DIST=$1
  NODE_ENV=production webpack --config $WEBPACK_CONFIG --output-path "$TMP_DIR" --display errors-only --env.mode=size --env.dist=$DIST
}

print_bundle_size() {
  build_bundle $1
  print_size $1
}

# Main Script

echo
echo -e "\033[93mAutomatically collecting metrics for $module\033[0m"
echo

rm -rf $TMP_DIR
mkdir $TMP_DIR

print_size_header

print_bundle_size es5
print_bundle_size esm
print_bundle_size es6

rm -rf $TMP_DIR
