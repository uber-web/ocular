#!/bin/bash
# Script to publish modules

set -e

usage() {
  # TODO: Add more specific url
  open "https://uber-web.github.io/ocular/docs/dev-tools/cli/ocular-publish"
}

# beta, prod, version-beta or version-prod
MODE=$1

bumpVersion() {
  local versionType
  if [[ $1 == "beta" ]]; then
    versionType=prerelease
  else
    versionType=patch
  fi

  if [ -d "modules" ]; then
    (set -x; lerna version $versionType --force-publish --exact --no-commit-hooks)
  else
    # -f includes any changes in the version commit
    (set -x; npm version $versionType --force)
    # push to branch
    (set -x; git push && git push --tags)
  fi
}

publishToNPM() {
  local tag=$1
  if [ -d "modules" ]; then
    if [ -z $tag ]; then
      # use default tag ('latest' or publishConfig.tag in package.json)
      (set -x; lerna publish from-git --force-publish --no-commit-hooks)
    else
      (set -x; lerna publish from-git --force-publish --dist-tag $tag --no-commit-hooks)
    fi
  else
    if [ -z $tag ]; then
      (set -x; npm publish)
    else
      (set -x; npm publish --tag $tag)
    fi
  fi
}

if [[ $MODE != "version-"* && $MODE != "help" ]]; then
  # will build and publish to NPM
  ocular-bootstrap
  ocular-test
  ocular-test dist
fi

case $MODE in
  "help")
    usage
    ;;

  "version-beta")
    bumpVersion beta
    ;;

  "version-prod")
    bumpVersion prod
    ;;

  "beta")
    bumpVersion beta
    publishToNPM ${2:-beta}
    ;;

  "prod")
    bumpVersion beta
    publishToNPM $2
    ;;

  "from-git")
    # publish from existing tag
    gitTag=$(git describe)
    if [[ $gitTag == *"-"* ]]; then
      publishToNPM ${2:-beta}
    else
      publishToNPM $2
    fi
    ;;

  *)
    echo -e "\033[91mUnknown publish mode. ocular-publish ['prod' | 'beta' | 'version-prod' | 'version-beta' | 'from-git']\033[0m"
    exit 1;;
esac
