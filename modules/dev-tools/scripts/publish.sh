#!/bin/sh
# Script to publish modules

set -e

BASEDIR=$(dirname "$0")

# beta or prod
MODE=$1

if [ -d "modules" ]; then
  case $MODE in
    "beta")
      # npm-tag argument: npm publish --tag <beta>
      # cd-version argument: increase <prerelease> version
      lerna publish --npm-tag beta --cd-version prerelease
      break;;

    "prod")
      lerna publish --cd-version minor
      break;;

    *) ;;
  esac
else
  case $MODE in
    "beta")
      npm run build && npm run test && npm run tester dist && npm publish --tag beta
      break;;

    "prod")
      npm run build && npm run test && npm run tester dist && npm publish
      break;;

    *) ;;
  esac
fi
