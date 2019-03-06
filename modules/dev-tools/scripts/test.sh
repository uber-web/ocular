#!/bin/sh
# Automated tests

set -e

BASEDIR=$(dirname "$0")

MODE=$1

MODULE_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`

run_test_script() {
  node $MODULE_DIR/node/test.js $1
}

run_full_test() {
  npm run lint
  run_test_script node
  run_test_script browser-headless
}

case $MODE in
  "")
    echo "test [ 'full' | 'fast' | 'dist' | 'bench' | 'ci' | 'cover' ]"
    echo "Running 'full' test by default"
    run_full_test
    break;;

  "full")
    run_full_test
    break;;

  "fast")
    npm run lint fast
    run_test_script node
    break;;

  "dist")
    npm run build
    run_test_script dist
    break;;

  "cover")
    # Seems to need to be run from each package.json root...
    # (cd $BASEDIR/../modules/core && NODE_ENV=test BABEL_ENV=cover npx nyc node $BASEDIR/../test/start.js cover)
    NODE_ENV=test BABEL_ENV=cover npx nyc node test/start.js cover
    npx nyc report
    break;;

  "ci")
    # run by Travis CI
    run_full_test
    # node test/start.js bench
    ocular-metrics
    # npm run cover
    break;;

  *)
    # default test
    run_test_script $MODE
    break;;
  esac
