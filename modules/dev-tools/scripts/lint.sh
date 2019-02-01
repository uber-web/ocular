#!/bin/sh
# Script to check code styles

set -e

if [ -d "modules" ]; then
  npx prettier-check "{modules,examples,test}/**/*.js" || echo "Running prettier." && npx prettier --write "{modules,examples,test}/**/*.js" --loglevel warn
  npx eslint modules test examples
else
  npx prettier-check "{src,examples,test}/**/*.js" || echo "Running prettier." && npx prettier --write "{src,examples,test}/**/*.js" --loglevel warn
  npx eslint src test examples
fi

# check if yarn.lock contains private registry information
!(grep -q unpm.u yarn.lock) && echo 'Lockfile valid.' || (echo 'Please rebuild yarn file using public npmrc' && false)
