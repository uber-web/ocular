// [Validate.js](http://validatejs.org/)
const validate = require('validate.js');
const {log, COLOR} = require('./log');

// TODO: theoretically, we should be able to validate the local path and url with regex below.
// Format validator: http://validatejs.org/#validators-format
// const LOCAL_FILE_PATH = /^((\.\.|[a-zA-Z0-9_/\-\\])*\.[a-zA-Z0-9]+)/g;
// const URL_PATH_PATTERN = /^\/([A-z0-9-_+]+\/)*([A-z0-9])*$/g;

// custom validators:
// http://validatejs.org/#custom-validator

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
  // check value is array
  if (!validate.isArray(value)) {
    return `${key} needs to be an array.`;
  }
  if (value.length === 0 && !allowEmpty) {
    return `${key} cannot be empty.`;
  }
  // check every element in the array
  const messages = value.map(v => validate(v, constraint)).filter(Boolean);
  if (messages.length > 0) {
    // consolidate error messages of each element
    return messages.map((m, idx) => {
      return `${key}[${idx}]: ${Object.values(m)}`;
    });
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
  // TODO: we could validate the object properties, too.
  // pass validation
  return null;
};

/**
 * Check the value cannot be blank when prerequisite is established.
 * @param  {Any} value   The value to be validated.
 * @param  {Object} options Not used at this momemt.
 *         {Function} options.test  A function to test prerequisite.
 *         {String}   options.message  Custom message when the prerequisite is established
 * @param  {String} key     The key of the value.
 * @param  {Object} attributes The entire object to be examined.
 * @return {String|Array}   The validation result(a string). Return null if passes.
 */
validate.validators.prerequisite = function prerequisite(
  value,
  options,
  key,
  attributes
) {
  if (options.test(attributes) && !value) {
    return options.message;
  }
  return null;
};

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
// Create our own custom reusable validator.
const constraints = {

  // Number, optional, value range between 0 to 5
  logLevel: {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 5,
      notValid: 'should be between 0 to 5.'
    }
  },

  // String, optional, local path
  DOC_FOLDER: {
    anyString: {
      message: 'should be the local path to the doc folder.'
    }
  },

  // String, optional, local path
  ROOT_FOLDER: {
    anyString: {
      message: 'should be the local path to the root folder.'
    }
  },

  // String, optional, local path
  DIR_NAME: {
    anyString: {
      message: 'should be the local path to the gatsby website folder.'
    }
  },

  // Array of examples, required,
  // Example object: {title, image, componentUrl, path}
  // title: string, required
  // image: string, required
  // componentUrl: string, required
  // path: string, required
  EXAMPLES: {
    presence: true,
    arrayValidate: {
      allowEmpty: true,
      constraint: {
        title: {
          presence: true,
          anyString: {
            message: 'title is the title of the example.'
          }
        },
        image: {
          presence: true,
          anyString: {
            message:
              'image should be the local path to the image in /static folder.'
          }
        },
        componentUrl: {
          presence: true,
          anyString: {
            message: 'componentUrl should be the local path to the component.'
          }
        },
        path: {
          presence: true,
          anyString: {
            message: 'should be the URL path to the example.'
          }
        }
      }
    }
  },

  // Object, optional
  DOCS: {
    objectValidate: true
  },

  // One of ['github', ''], required
  PROJECT_TYPE: {
    presence: true,
    inclusion: {
      within: ['github', ''],
      message:
        'should be set to "github" if your project is hosted on Github, or leave it empty.'
    }
  },

  // String, optional
  PROJECT_NAME: {
    anyString: {
      message: `should be the project's name on Github.`
    }
  },

  // String, optional
  PROJECT_ORG: {
    anyString: {
      message: `should be the project's Github organization`
    }
  },

  // URL, required
  PROJECT_URL: {
    presence: true,
    url: true
  },

  // String, required
  PROJECT_DESC: {
    presence: true,
    anyString: {
      message: `should be the project's description`
    }
  },

  // String, optional
  PATH_PREFIX: {
    anyString: {
      message: 'should be the prefix added to all paths on the site'
    }
  },

  // String, optional
  FOOTER_LOGO: {
    anyString: {
      message: 'should be the local path to foorter logo'
    }
  },

  // Array of projects, optional
  // Project object: {title, url}
  // title: string, required
  // url: string, required
  PROJECTS: {
    arrayValidate: {
      allowEmpty: true,
      constraint: {
        title: {
          presence: true,
          anyString: {
            message: 'is the title of the project.'
          }
        },
        url: {
          presence: true,
          url: true
        }
      }
    }
  },

  // String, optional
  HOME_PATH: {
    anyString: {
      message: 'should be the path to the home page'
    }
  },

  // TODO: what's this?
  // String, required
  HOME_HEADING: {
    presence: true,
    anyString: {
      message: 'should be ...'
    }
  },

  // TODO: what's this?
  // String, optional
  HOME_RIGHT: {
    anyString: {
      message: 'should be ...'
    }
  },

  // Array of home bullets, required,
  // Home bullet object: {text, desc, img}
  // text: string, required
  // desc: string, optional
  // img: string, required
  HOME_BULLETS: {
    presence: true,
    arrayValidate: {
      allowEmpty: false,
      constraint: {
        text: {
          presence: {allowEmpty: false},
          anyString: {
            message: 'is the title of the home bullet.'
          }
        },
        desc: {
          anyString: {
            message: 'should be the description of the home bullet',
            allowEmpty: true
          }
        },
        img: {
          presence: {allowEmpty: false},
          anyString: {
            message:
              'should be the local path to the preview image in /static folder.'
          }
        }
      }
    }
  },

  // Array of theme overides, required,
  // Theme override object: {key, value}
  // key: string, required
  // value: string, required
  THEME_OVERRIDES: {
    arrayValidate: {
      allowEmpty: false,
      constraint: {
        key: {presence: true},
        value: {presence: true}
      }
    }
  },

  // Array of additional links, required,
  // Additional link object: {index, name, href}
  // index: number, optional
  // name: string, required
  // href: string, required
  ADDITIONAL_LINKS: {
    presence: true,
    arrayValidate: {
      allowEmpty: true,
      constraint: {
        index: {
          numericality: true
        },
        name: {
          presence: {allowEmpty: false},
          anyString: {
            message: 'is the title of the link.'
          }
        },
        href: {
          presence: {allowEmpty: false},
          anyString: {
            message: 'should be a local path.'
          }
        }
      }
    }
  },

  // String, optional
  GA_TRACKING: {
    anyString: {
      message: 'should be the Google analytics key'
    }
  },
  // String, required if PROJECT_TYPE === 'github'
  GITHUB_KEY: {
    prerequisite: {
      test: attributes => attributes.PROJECT_TYPE === 'github',
      message: 'must be provided if your project is hosted on Github.'
    }
  },

  // Object, optional
  webpack: {
    objectValidate: true
  }
};

// validate the config and return a list of warnings.
function validateConfig(config) {
  // check unused/deprecated config
  const unusedProperties = Object.keys(config).filter(key => !constraints[key]);
  // check config, validate function will return a object with corresponding warnings.
  // ex: {GITHUB_KEY: ['must be provided if your project is hosted on Github.']}
  const messages = validate(config, constraints) || {};
  const allMessages = [
    ...unusedProperties.map(key => `${key} is not used in the gatsby config.`),
    ...Object.keys(messages).map(key => messages[key].toString())
  ];
  // print out all warnings
  allMessages.forEach(message =>
    log.log({color: COLOR.RED, priority: 0}, `[gatsby-config] ${message}`)()
  );
  return allMessages;
}

module.exports.validateConfig = validateConfig;
