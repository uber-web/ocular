#!/bin/bash
# Script to collect build size information

# set -ex

export PATH=$PATH:node_modules/.bin

DEV_TOOLS_DIR=$(dirname $0)/..
WORKING_DIR=`pwd`
TMP_DIR=$WORKING_DIR/tmp

# Get size metric entry point
ENTRY_POINTS=`ts-node $DEV_TOOLS_DIR/src/helpers/get-config.js ".entry.size"`
IFS=','
read -a ENTRY_POINTS_ARR <<< "$ENTRY_POINTS"
IFS=' '

# Get name from package.json
module=`node -e "console.log(require('./package.json').name)"`
# Get version
if [ -d "modules" ]; then
  # Use lerna version if monorepo
  packageInfo=./lerna.json
else
  # Use package.json version if monorepo
  packageInfo=./package.json
fi
# Get version from packag.json and remove quotes
version=`node -e "console.log(require('${packageInfo}').version)"`

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
  if [ "$2" == es5 ]; then
    DIST="main,module"
  else
    DIST="module,browser,main"
  fi
  (esbuild $1 --outdir="$TMP_DIR" --bundle --minify --main-fields=$DIST --log-level=error)
}

# Main Script

echo
echo -e "\033[93mAutomatically collecting metrics for $module\033[0m"
echo

rm -rf $TMP_DIR
mkdir $TMP_DIR

print_size_header

for f in "${ENTRY_POINTS_ARR[@]}"; do
  build_bundle $f es5
done
print_size es5

for f in "${ENTRY_POINTS_ARR[@]}"; do
  build_bundle $f esm
done
print_size esm

rm -rf $TMP_DIR
