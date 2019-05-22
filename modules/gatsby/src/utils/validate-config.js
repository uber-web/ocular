// [Validate.js](http://validatejs.org/)
const validate = require('validate.js');
const {log, COLOR} = require('./log');

// TODO: theoretically, we should be able to validate the local path and url with regex below.
// Needs more tests later.
// const LOCAL_FILE_PATH = /^((\.\.|[a-zA-Z0-9_/\-\\])*\.[a-zA-Z0-9]+)/g;
// const URL_PATH_PATTERN = /^\/([A-z0-9-_+]+\/)*([A-z0-9])*$/g;

// custom validators:
// http://validatejs.org/#custom-validator
// validate if the value is a string (null is allowed).
validate.validators.anyString = function anyString(value, options) {
  // allow value === null
  if (value === null) {
    return null;
  }
  if (value === undefined && options.allowEmpty) {
    return null;
  }
  // check value is string
  if (!validate.isString(value)) {
    return options.message;
  }
  // pass validation
  return null;
};

// check every element in an array.
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

// check if the value is an object.
validate.validators.objectValidate = function objectValidate(
  value,
  constraint,
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

// check the value cannot be blank when prerequisite is true
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
  logLevel: {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 5,
      notValid: 'should be between 1 to 5.'
    }
  },

  DOC_FOLDER: {
    anyString: {
      message: 'should be the local path to the doc folder.'
    }
  },

  ROOT_FOLDER: {
    anyString: {
      message: 'should be the local path to the root folder.'
    }
  },

  DIR_NAME: {
    anyString: {
      message: 'should be the local path to the gatsby website folder.'
    }
  },

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

  DOCS: {
    objectValidate: true
  },

  PROJECT_TYPE: {
    presence: true,
    inclusion: {
      within: ['github', ''],
      message:
        'should be set to "github" if your project is hosted on Github, or leave it empty.'
    }
  },

  PROJECT_NAME: {
    anyString: {
      message: `should be the project's name on Github.`
    }
  },

  PROJECT_ORG: {
    anyString: {
      message: `should be the project's Github organization`
    }
  },

  PROJECT_URL: {
    presence: true,
    url: true
  },

  PROJECT_DESC: {
    presence: true,
    anyString: {
      message: `should be the project's description`
    }
  },

  PATH_PREFIX: {
    anyString: {
      message: 'should be the prefix added to all paths on the site'
    }
  },

  FOOTER_LOGO: {
    anyString: {
      message: 'should be the local path to foorter logo'
    }
  },

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

  HOME_PATH: {
    anyString: {
      message: 'should be the path to the home page'
    }
  },

  // TODO: what's this?
  HOME_HEADING: {
    presence: true,
    anyString: {
      message: 'should be ...'
    }
  },

  // TODO: what's this?
  HOME_RIGHT: {
    anyString: {
      message: 'should be ...'
    }
  },

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

  THEME_OVERRIDES: {
    arrayValidate: {
      allowEmpty: false,
      constraint: {
        key: {presence: true},
        value: {presence: true}
      }
    }
  },

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

  GA_TRACKING: {
    anyString: {
      message: 'should be the Google analytics key'
    }
  },

  GITHUB_KEY: {
    prerequisite: {
      test: attributes => attributes.PROJECT_TYPE === 'github',
      message: 'must be provided if your project is hosted on Github.'
    }
  },

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
