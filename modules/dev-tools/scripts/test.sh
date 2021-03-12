#!/bin/bash
# Automated tests

set -e

BASEDIR=$(dirname "$0")

MODE=$1

MODULE_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`

usage() {
  # TODO: Add more specific url
  open "https://uber-web.github.io/ocular/docs/dev-tools/cli/ocular-test"
}

run_test_script() {
  # get Chromium executable path
  YARN_GLOBAL_DIR=`yarn global dir`
  CHROMIUM_EXECUTABLE=`node $MODULE_DIR/node/get-puppeteer-executable-path.js $YARN_GLOBAL_DIR`

  BABEL_ENV=test PUPPETEER_EXECUTABLE_PATH=$CHROMIUM_EXECUTABLE node $MODULE_DIR/node/test.js $1
}

run_full_test() {
  npm run lint
  run_test_script node
  run_test_script browser-headless
  ocular-metrics
}

case $MODE in
  "")
    echo "test [ 'full' | 'fast' | 'dist' | 'bench' | 'ci' | 'cover' ]"
    echo "Running 'full' test by default"
    run_full_test
    ;;

  "full")
    run_full_test
    ;;

  "fast")
    ocular-lint pre-commit
    run_test_script node
    ;;

  "dist")
    run_test_script dist
    ;;

  "cover")
    (set -x; NODE_ENV=test BABEL_ENV=test npx nyc node $MODULE_DIR/node/test.js cover)
    (set -x; npx nyc report --reporter=lcov)
    ;;

  "ci")
    # run by Travis CI
    npm run lint
    run_test_script browser-headless
    ocular-test cover
    # node test/start.js bench
    # ocular-metrics
    ;;

  "node-debug")
    echo "Open chrome://inspect/#devices to attach debugger."
    (set -x; node --inspect-brk $MODULE_DIR/node/test.js node)
    ;;

  *)
    # default test
    run_test_script $MODE
    ;;
  esac
