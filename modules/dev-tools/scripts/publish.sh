#!/bin/sh
# Script to publish modules

set -e

BASEDIR=$(dirname "$0")

# beta or prod
MODE=$1

case $MODE in
  "beta")
    npm run build && npm run test && npm run tester dist && npm publish --tag beta
    break;;

  "prod")
    npm run build && npm run test && npm run tester dist && npm publish
    break;;

  *) ;;
esac
