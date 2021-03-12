#!/bin/bash
# Script to check code styles

set -e

# Lint selected directories
# lint.sh DIR1,DIR2
MODE=$1

DEV_TOOLS_DIR=`node -e "require('ocular-dev-tools/node/module-dir')()"`

DIRECTORIES=`node $DEV_TOOLS_DIR/node/get-config.js ".lint.paths"`
if [[ $DIRECTORIES == *","* ]]; then
  DIRECTORIES={$DIRECTORIES}
fi

EXTENSIONS=`node $DEV_TOOLS_DIR/node/get-config.js ".lint.extensions"`
if [[ $EXTENSIONS == *","* ]]; then
  EXTENSIONS={$EXTENSIONS}
fi

DIR_PATTERN="$DIRECTORIES/**/*.$EXTENSIONS"
ROOT_PATTERN="*.$EXTENSIONS"

usage() {
  # TODO: Add more specific url
  open "https://uber-web.github.io/ocular/docs/dev-tools/cli/ocular-lint"
}

print_yellow() {
  echo -e "\033[93m${1}\033[0m"
}

case $MODE in
  "help")
    usage
    ;;

  "pre-commit")
    print_yellow "Running prettier & eslint on changed files..."

    NAME_PATTERN=`echo "^$DIRECTORIES/.*\.$EXTENSIONS$" | sed -e 's/,/|/g' | sed -e 's/{/(/g' | sed -e 's/}/)/g'`

    # only check changed files
    set +e
    FILES=`git diff HEAD --name-only | grep -E "${NAME_PATTERN}"`
    set -e

    FILES_LIST=""

    if [ ! -z "${FILES}" ]; then
      for f in $FILES
        do
          if [ -e "${f}" ]; then
            FILES_LIST+="${f} "
          fi
      done

      (set -x; npx prettier-check $FILES_LIST)
      (set -x; npx eslint $FILES_LIST)
    fi
    ;;

  "fix")
    print_yellow "Running prettier in $DIRECTORIES..."
    (set -x; npx prettier --loglevel warn --write "$DIR_PATTERN" "$ROOT_PATTERN")

    print_yellow "Running eslint in $DIRECTORIES..."
    (set -x; npx eslint --fix "$DIRECTORIES/**/*.$EXTENSIONS")
    ;;

  *)
    print_yellow "Checking prettier code style in $DIRECTORIES..."
    (set -x; npx prettier-check  "$DIR_PATTERN" "$ROOT_PATTERN" ||
      (echo -e "\033[91mNot all files using prettier code style. This may be fixed by running\033[0m \033[1mnpm run lint fix\033[0m" &&
      exit 1))

    print_yellow "Running eslint in $DIRECTORIES..."
    (set -x; npx eslint "$DIRECTORIES/**/*.$EXTENSIONS")
    ;;
  esac

# check if yarn.lock contains private registry information
!(grep -q unpm.u yarn.lock) && echo "Lockfile valid." || (echo -e "\033[91mPlease rebuild yarn file using public npmrc\033[0m" && false)
