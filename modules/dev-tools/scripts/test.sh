#!/bin/bash
# Automated tests

set -e

BASEDIR=$(dirname "$0")

MODE=$1

MODULE_DIR=$(dirname $0)/..
TEST_SCRIPT=$MODULE_DIR/src/test.js

usage() {
  # TODO: Add more specific url
  open "https://uber-web.github.io/ocular/docs/dev-tools/cli/ocular-test"
}

run_test_script() {
  (set -x; NODE_ENV=test node $TEST_SCRIPT $1)
}

run_full_test() {
  npm run lint
  run_test_script node
  run_test_script browser-headless
  ocular-metrics
}

case $MODE in
  "")
    echo "test [ 'full' | 'fast' | 'dist' | 'bench' | 'ci' | 'cover' | 'browser' | 'browser-headless' ]"
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

  "node")
    run_test_script $MODE
    ;;

  "node-debug")
    echo "Open chrome://inspect/#devices to attach debugger."
    (set -x; node --inspect-brk $TEST_SCRIPT node)
    ;;

  "dist")
    run_test_script dist
    ;;

  "cover")
    (set -x; npx c8 node $TEST_SCRIPT cover)
    (set -x; npx c8 report --reporter=lcov)
    ;;

  "ci")
    # run by Travis CI
    npm run lint
    run_test_script browser-headless
    ocular-test cover
    # node test/start.js bench
    # ocular-metrics
    ;;

  "browser")
    run_test_script $MODE
    ;;

  "browser-headless")
    run_test_script $MODE
    ;;

  "bench")
    run_test_script $MODE
    ;;

  "bench-browser")
    run_test_script $MODE
    ;;

  *)
    # default test
    # echo "Error: unknown test mode $MODE"
    # usage()
    ;;

  esac
