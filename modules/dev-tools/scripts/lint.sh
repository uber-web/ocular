#!/bin/sh
# Script to check code styles

set -e

# Lint selected directories
# lint.sh DIR1,DIR2
DIRECTORIES=$1
MODE=$2

if [ -z "$1" ]; then
  echo "Lint: must specify directories"
  exit 1
fi

case $MODE in
  "fast")
    echo "Running prettier & eslint..."

    # only check changed files
    set +e
    FILES=`git diff HEAD --name-only | grep .js$`
    set -e

    if [ ! -z "${FILES}" ]; then
      for f in $FILES
        do
          if [ -e "${f}" ]; then
            npx prettier --write $f --loglevel warn
            npx eslint $f
          fi
      done
    fi

    # add changes to commit
    git add .
    break;;

  *)
    echo "Checking prettier code styles..."

    DIR_PATTERN="{$DIRECTORIES}/**/*.{js,md}"
    ROOT_PATTERN="*.md"
    npx prettier-check  "$DIR_PATTERN" "$ROOT_PATTERN" \
        || echo "Running prettier." \
        && npx prettier --loglevel warn --write "$DIR_PATTERN" "$ROOT_PATTERN"

    echo "Running eslint..."
    npx eslint "{$DIRECTORIES}"
    ;;
  esac

# check if yarn.lock contains private registry information
!(grep -q unpm.u yarn.lock) && echo 'Lockfile valid.' || (echo 'Please rebuild yarn file using public npmrc' && false)
