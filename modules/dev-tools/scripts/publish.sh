#!/bin/sh
# Script to publish modules

set -e

BASEDIR=$(dirname "$0")

npm run bootstrap
npm run test
npm run test dist

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
      npm publish --tag beta
      break;;

    "prod")
      npm publish
      break;;

    *) ;;
  esac
fi
