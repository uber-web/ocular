#!/bin/bash
# Script to publish modules

set -e

usage() {
  # TODO: Add more specific url
  open "https://uber-web.github.io/ocular/docs/dev-tools"
}

BASEDIR=$(dirname "$0")

ocular-bootstrap
ocular-test
ocular-test dist

# beta or prod
MODE=$1

if [ -d "modules" ]; then
  case $MODE in
    "help")
      usage
      ;;

    "beta")
      # npm-tag argument: npm publish --tag <beta>
      # cd-version argument: increase <prerelease> version
      lerna publish --force-publish --exact --npm-tag beta --cd-version prerelease
      ;;

    "prod")
      lerna publish --force-publish --exact --cd-version patch
      ;;

    *)
      echo -e "\033[91mUnknown publish mode. ocular-publish ['prod' | 'beta']\033[0m"
      exit 1;;
  esac
else
  case $MODE in
    "help")
      usage
      break;;

    "beta")
      npm version prerelease
      npm publish --tag beta
      break;;

    "prod")
      npm version patch
      npm publish
      break;;

    *)
      echo -e "\033[91mUnknown publish mode. ocular-publish ['prod' | 'beta']\033[0m"
      exit 1;;
  esac
fi
