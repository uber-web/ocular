// [Validate.js](http://validatejs.org/)
const validate = require('validate.js');
const {log, COLOR} = require('./log');

// TODO(@javidhsueh): theoretically, we should be able to validate the local path and url with regex below.
// Format validator: http://validatejs.org/#validators-format
// const LOCAL_FILE_PATH = /^((\.\.|[a-zA-Z0-9_/\-\\])*\.[a-zA-Z0-9]+)/g;
// const URL_PATH_PATTERN = /^\/([A-z0-9-_+]+\/)*([A-z0-9])*$/g;

// validators we used below:
// [numericality](http://validatejs.org/#validators-numericality)
// check if the value is a valid number
//
// [presence](http://validatejs.org/#validators-presence)
// The presence validator validates that the value is defined.
//
// [url](http://validatejs.org/#validators-url)
// The URL validator ensures that the input is a valid URL.
//
// [custom validator](http://validatejs.org/#custom-validator)
// See below

/**
 * Validate if the value is a string (null is allowed).
 * @param  {String} value   The string to be validated.
 * @param  {Object} options The options for validation.
 *         {String} options.message  Custom message when the value is invalid.
 *         {Bool}   options.allowEmpty  Allow the string is empty/undefined/null.
 * @param  {String} key     The key of the string
 * @return {String}         The validation result(a string). Return null if passes.
 */
validate.validators.anyString = function anyString(value, options) {
  if (!value && options.allowEmpty) {
    return null;
  }
  // check value is string
  if (!validate.isString(value)) {
    return options.message;
  }
  // pass validation
  return null;
};

/**
 * Check every element in an array of objects
 * @param  {Array} value    The array to be validated.
 * @param  {Object} options The options for validation.
 *         {Object} options.constraint  The constraint for validating each object in the array.
 *         {Bool}   options.allowEmpty  Allow the array is empty.
 * @param  {String} key     The key of the array
 * @return {String|Array}   The validation result(a string or a list of strings). Return null if passes.
 */
validate.validators.arrayValidate = function arrayValidate(
  value,
  options,
  key
) {
  const {allowEmpty, constraint} = options;
  if (!value && allowEmpty) {
    return null;
  }
  // check value is array
  if (!validate.isArray(value)) {
    return `${key} needs to be an array.`;
  }
  if (value.length === 0 && !allowEmpty) {
    return `${key} cannot be empty.`;
  }
  // check every element in the array
  const messages = value
    .map(v => {
      if (validate.isObject(v)) {
        return validate(v, constraint);
      }
      return validate.single(v, constraint);
    })
    .filter(Boolean);
  if (messages.length > 0) {
    // consolidate error messages of each element
    return messages.map((m, idx) => `${key}[${idx}]: ${Object.values(m)}`);
  }
  // pass validation
  return null;
};

/**
 * Check if the value is an object.
 * @param  {Object} value   The object to be validated.
 * @param  {Object} options Not used at this momemt.
 * @param  {String} key     The key of the object
 * @return {String|Array}   The validation result(a string). Return null if passes.
 */
validate.validators.objectValidate = function objectValidate(
  value,
  options,
  key
) {
  // check value is object
  if (!validate.isObject(value)) {
    return `${key} needs to be an object.`;
  }
  // TODO(@javidhsueh): we could validate the object properties, too.
  // pass validation
  return null;
};

/**
 * Check the value cannot be blank when project type is github.
 * @param  {Any} value   The value to be validated.
 * @param  {Object} options The options for validation.
 *         {String}   options.message  Custom message when the value is invalid
 * @param  {String} key     The key of the value.
 * @param  {Object} attributes The entire object to be examined.
 * @return {String|Array}   The validation result(a string). Return null if passes.
 */
validate.validators.requiredForGitHubProject = function prerequisite(
  value,
  options,
  key,
  attributes
) {
  if (attributes.PROJECT_TYPE === 'github' && !value) {
    return options.message;
  }
  return null;
};

const WILL_DEPRECATED = ['DOC_FOLDER'];

// validate the config and return a list of warnings.
module.exports = function validateConfig(config, constraints) {
  // check unused/deprecated config
  const unusedProperties = Object.keys(config).filter(key => !constraints[key]);
  const deprecatedProperties = Object.keys(config).filter(key =>
    WILL_DEPRECATED.includes(key)
  );
  // check config, validate function will return a object with corresponding warnings.
  // ex: {GITHUB_KEY: ['must be provided if your project is hosted on GitHub.']}
  const messages = validate(config, constraints) || {};
  const allMessages = [
    ...unusedProperties.map(key => `${key} is not used in the gatsby config.`),
    ...deprecatedProperties.map(key => `${key} will be deprecated soon.`),
    ...Object.keys(messages).map(key => messages[key].toString())
  ];
  // print out all warnings
  allMessages.forEach(message =>
    log.log({color: COLOR.RED, priority: 0}, `[gatsby-config] ${message}`)()
  );
  return allMessages;
};
