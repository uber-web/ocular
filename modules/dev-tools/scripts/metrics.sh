#!/bin/sh
# Script to collect build size information

# set -e

export PATH=$PATH:node_modules/.bin

MODULE_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`

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
version=$(jq '.version' $packageInfo | awk '{ gsub(/"/,"",$1); printf "%-14s", $1 }')

# Helper functions

print_size_header() {
  echo "\033[1m| Version        | Dist | Bundle Size      | Compressed     | Imports   |\033[0m"
  echo "| ---            | ---  | ---              | ---            | ---       |"
}

print_size() {
  DIST=$1
  EXAMPLE=$2

  # Size it
  size=$(wc -c /tmp/bundle.js | awk '{ print int($1 / 1024) "KB (" $1 ")" }')
  # Zip it
  gzip -9f /tmp/bundle.js
  # Size it again
  zipsize=$(wc -c /tmp/bundle.js.gz | awk '{ print int($1 / 1024) "KB (" $1 ")" }')  # Size it
  # Remove our copy
  rm /tmp/bundle.js.gz
  # Print version, size, compressed size with markdown

  echo "| $version | $DIST  | $size KB  | $zipsize KB     | $EXAMPLE "
}

build_bundle() {
  DIST=$1
  EXAMPLE=$2
  NODE_ENV=production webpack --config $MODULE_DIR/config/webpack.config.js --hide-modules --env.$EXAMPLE --env.mode=bundle --env.dist=$DIST > /dev/null
  cp dist/bundle.js /tmp/bundle.js
}

print_bundle_size() {
  build_bundle $1 $2
  print_size $1 $2
}

print_all_loop() {
  ROOT_NODE_MODULES_DIR=`pwd`

  print_size_header

  print_bundle_size es5 all
  print_bundle_size esm all
  print_bundle_size es6 all
}
# Main Script

echo
echo "\033[93mAutomatically collecting metrics for $module\033[0m"
echo

print_all_loop
