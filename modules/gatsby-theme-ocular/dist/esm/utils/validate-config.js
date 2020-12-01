import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

var validate = require('validate.js');

var _require = require('./log'),
    log = _require.log,
    COLOR = _require.COLOR;

validate.validators.anyString = function anyString(value, options) {
  if (!value && options.allowEmpty) {
    return null;
  }

  if (!validate.isString(value)) {
    return options.message;
  }

  return null;
};

validate.validators.arrayValidate = function arrayValidate(value, options, key) {
  var allowEmpty = options.allowEmpty,
      constraint = options.constraint;

  if (!value && allowEmpty) {
    return null;
  }

  if (!validate.isArray(value)) {
    return "".concat(key, " needs to be an array.");
  }

  if (value.length === 0 && !allowEmpty) {
    return "".concat(key, " cannot be empty.");
  }

  var messages = value.map(function (v) {
    if (validate.isObject(v)) {
      return validate(v, constraint);
    }

    return validate.single(v, constraint);
  }).filter(Boolean);

  if (messages.length > 0) {
    return messages.map(function (m, idx) {
      return "".concat(key, "[").concat(idx, "]: ").concat(Object.values(m));
    });
  }

  return null;
};

validate.validators.objectValidate = function objectValidate(value, options, key) {
  if (!validate.isObject(value)) {
    return "".concat(key, " needs to be an object.");
  }

  return null;
};

validate.validators.requiredForGitHubProject = function prerequisite(value, options, key, attributes) {
  if (attributes.PROJECT_TYPE === 'github' && !value) {
    return options.message;
  }

  return null;
};

var WILL_DEPRECATED = ['DOC_FOLDER'];

module.exports = function validateConfig(config, constraints) {
  var unusedProperties = Object.keys(config).filter(function (key) {
    return !constraints[key];
  });
  var deprecatedProperties = Object.keys(config).filter(function (key) {
    return WILL_DEPRECATED.includes(key);
  });
  var messages = validate(config, constraints) || {};
  var allMessages = [].concat(_toConsumableArray(unusedProperties.map(function (key) {
    return "".concat(key, " is not used in the gatsby config.");
  })), _toConsumableArray(deprecatedProperties.map(function (key) {
    return "".concat(key, " will be deprecated soon.");
  })), _toConsumableArray(Object.keys(messages).map(function (key) {
    return messages[key].toString();
  })));
  allMessages.forEach(function (message) {
    return log.log({
      color: COLOR.RED,
      priority: 0
    }, "[gatsby-config] ".concat(message))();
  });
  return allMessages;
};
//# sourceMappingURL=validate-config.js.map