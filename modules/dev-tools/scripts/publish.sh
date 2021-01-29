#!/bin/bash
# Script to publish modules

set -e

usage() {
  # TODO: Add more specific url
  open "https://uber-web.github.io/ocular/docs/dev-tools/cli/ocular-publish"
}

BASEDIR=$(dirname "$0")

ocular-bootstrap
ocular-test
ocular-test dist

# beta or prod
MODE=$1
# custom tag
TAG=$2

if [ -d "modules" ]; then
  case $MODE in
    "help")
      usage
      ;;

    "beta")
      # npm-tag argument: npm publish --tag <beta>
      # cd-version argument: increase <prerelease> version
      if [ -z "$TAG" ]
      then
        lerna publish --force-publish --exact --npm-tag beta --cd-version prerelease
      else
        lerna publish --force-publish --exact --npm-tag $TAG --cd-version prerelease
      fi
      ;;

    "prod")
      if [ -z "$TAG" ]
      then
        # latest
        lerna publish --force-publish --exact --cd-version patch
      else
        lerna publish --force-publish --exact --npm-tag $TAG --cd-version patch
      fi
      ;;

    *)
      echo -e "\033[91mUnknown publish mode. ocular-publish ['prod' | 'beta']\033[0m"
      exit 1;;
  esac
else
  case $MODE in
    "help")
      usage
      ;;

    "beta")
      # -f includes any changes in the version commit
      npm version prerelease --force
      # push to branch
      git push && git push --tags
      if [ -z "$TAG" ]
      then
        npm publish --tag beta
      else
        npm publish --tag $TAG
      fi
      ;;

    "prod")
      # -f includes any changes in the version commit
      npm version patch --force
      # push to branch
      git push && git push --tags

      if [ -z "$TAG" ]
      then
        # latest
        npm publish
      else
        npm publish --tag $TAG
      fi
      ;;

    *)
      echo -e "\033[91mUnknown publish mode. ocular-publish ['prod' | 'beta']\033[0m"
      exit 1;;
  esac
fi
