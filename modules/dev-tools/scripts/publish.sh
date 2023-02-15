#!/bin/bash
# Script to publish modules

set -e
# set -x # uncomment to debug

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
        lerna publish prerelease --force-publish --exact --dist-tag beta --no-commit-hooks
      else
        lerna publish prerelease --force-publish --exact --dist-tag $TAG --no-commit-hooks
      fi
      ;;

    "prod")
      if [ -z "$TAG" ]
      then
        # latest
        lerna publish patch --force-publish --exact --no-commit-hooks
      else
        lerna publish patch --force-publish --exact --dist-tag $TAG --no-commit-hooks
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
