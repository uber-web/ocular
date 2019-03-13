#!/bin/bash
# Script to check code styles

set -e

# Lint selected directories
# lint.sh DIR1,DIR2
MODE=$1

DEV_TOOLS_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`

DIRECTORIES=`$DEV_TOOLS_DIR/scripts/print-config.sh ".lint.paths" | jq -r 'join(",")'`
if [[ $DIRECTORIES == *","* ]]; then
  DIRECTORIES={$DIRECTORIES}
fi

EXTENSIONS=`$DEV_TOOLS_DIR/scripts/print-config.sh ".lint.extensions" | jq -r 'join(",")'`
if [[ $EXTENSIONS == *","* ]]; then
  EXTENSIONS={$EXTENSIONS}
fi

DIR_PATTERN="$DIRECTORIES/**/*.$EXTENSIONS"
ROOT_PATTERN="*.$EXTENSIONS"

case $MODE in
  "fast")
    echo "\033[93mRunning prettier & eslint on changed files...\033[0m"

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
    echo "\033[93mChecking prettier code style in $DIRECTORIES...\033[0m"
    npx prettier-check  "$DIR_PATTERN" "$ROOT_PATTERN" \
     || echo "\033[91mRunning prettier...\033[0m" \
     && npx prettier --loglevel warn --write "$DIR_PATTERN" "$ROOT_PATTERN"

    echo "\033[93mRunning eslint in $DIRECTORIES...\033[0m"
    npx eslint "$DIRECTORIES"
    ;;
  esac

# check if yarn.lock contains private registry information
!(grep -q unpm.u yarn.lock) && echo 'Lockfile valid.' || (echo 'Please rebuild yarn file using public npmrc' && false)
