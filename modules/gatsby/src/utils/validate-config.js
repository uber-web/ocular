const validate = require('validate.js');
const {log, COLOR} = require('./log');

// const LOCAL_FILE_PATH = /^((\.\.|[a-zA-Z0-9_/\-\\])*\.[a-zA-Z0-9]+)/g;
// const URL_PATH_PATTERN = /^\/([A-z0-9-_+]+\/)*([A-z0-9])*$/g;

// custom validator: validate if the value is a string (null is allowed).
validate.validators.anyString = function anyString(value, options) {
  // allow value === null
  if (value === null) {
    return '';
  }
  if (value === undefined && options.allowEmpty) {
    return '';
  }
  // check value is string
  if (!validate.isString(value)) {
    return options.message;
  }
  // pass validation
  return '';
};

// custom validator: check every element in an array.
validate.validators.arrayValidate = function arrayValidate(
  value,
  constraint,
  key
) {
  // check value is array
  if (!validate.isArray(value)) {
    return `${key} needs to be an array.`;
  }
  // check every element in the array
  const messages = value.map(v => validate(v, constraint)).filter(Boolean);
  if (messages.length > 0) {
    return messages;
  }
  // pass validation
  return '';
};

// custom validator: check if the value is an object.
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
  return '';
};

const constraints = {
  logLevel: {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTO: 1,
      lessThanOrEqualTo: 5,
      notValid: 'should be between 1 to 5.'
    }
  },

  DOC_FOLDER: {
    anyString: {
      message: 'should be the local path to the doc folder.'
    }
  },

  // TODO: is it deprecated?
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
      title: {
        presence: true,
        anyString: {
          message: 'is the title of the project.'
        }
      },
      url: {
        presence: true,
        anyString: {
          message: 'should be the URL path to the project.'
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
      text: {
        presence: true,
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
        presence: true,
        anyString: {
          message:
            'should be the local path to the preview image in /static folder.'
        }
      }
    }
  },

  THEME_OVERRIDES: {
    arrayValidate: {
      key: {presence: true},
      value: {presence: true}
    }
  },

  ADDITIONAL_LINKS: {
    presence: true,
    arrayValidate: {
      index: {
        numericality: true
      },
      name: {
        presence: true,
        anyString: {
          message: 'is the title of the link.'
        }
      },
      href: {
        presence: true,
        anyString: {
          message: 'should be the URL path.'
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
    anyString: {
      message: `should be like btoa('YourUsername:YourKey') and should be readonly.`
    }
  },

  webpack: {
    objectValidate: true
  }
};

const defaults = {
  logLevel: 3,
  DOC_FOLDER: '/docs',
  // TODO: is it deprecated?
  ROOT_FOLDER: './',
  DIR_NAME: 'website',
  EXAMPLES: [],
  DOCS: {},
  PROJECT_TYPE: '',
  PROJECT_NAME: 'Ocular',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'http://localhost/',
  PROJECT_DESC: '',
  PATH_PREFIX: '/',
  FOOTER_LOGO: '',
  PROJECTS: [],
  HOME_PATH: '/',
  // TODO: what's this?
  HOME_HEADING: 'A documentation website made with Ocular',
  // TODO: what's this?
  HOME_RIGHT: null,
  HOME_BULLETS: [],
  THEME_OVERRIDES: [
    {
      key: 'none',
      value: 'none'
    }
  ],
  ADDITIONAL_LINKS: [],
  GA_TRACKING: null,
  GITHUB_KEY: null,
  webpack: {}
};

function validateConfig(config) {
  // check unused/deprecated config
  const unusedProperties = Object.keys(config).filter(key => !constraints[key]);
  // check required config
  const messages = validate(config, constraints) || {};
  // config padding
  // those values are required to support the query in ../site-query.jsx
  // if they don't exist, we provide empty values so that the query won't fail
  const paddedConfig = {
    ...defaults,
    ...config
  };
  // print out all error messages
  unusedProperties.forEach(key =>
    log.log(
      {color: COLOR.RED, priority: 0},
      `[gatsby-config] ${key} is deprecated.`
    )()
  );
  Object.keys(messages).forEach(key =>
    log.log(
      {color: COLOR.RED, priority: 0},
      `[gatsby-config] ${messages[key].toString()}`
    )()
  );
  // return new config;
  return paddedConfig;
}

module.exports.validateConfig = validateConfig;
