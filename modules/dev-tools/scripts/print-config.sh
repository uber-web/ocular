#!/bin/sh
# Prints resolved config values

# set -e

CONFIG_NAME=$1

node -e "let config = require('ocular-dev-tools/config/ocular.config')()$CONFIG_NAME;\
if (typeof config !== 'string') {\
  config = JSON.stringify(config);\
}\
console.log(config)"
