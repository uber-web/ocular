"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHeaderLinks = generateHeaderLinks;
exports.default = exports.propTypes = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _markGithub = _interopRequireDefault(require("react-icons/lib/go/mark-github"));

var _linksUtils = require("../../utils/links-utils.js");

var _header = require("../styled/header");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var propTypes = {
  config: _propTypes.default.object.isRequired
};
exports.propTypes = propTypes;

function GithubLink() {
  return _react.default.createElement(_react.default.Fragment, null, "GitHub", _react.default.createElement(_markGithub.default, {
    style: {
      marginLeft: '0.5rem',
      display: 'inline'
    }
  }));
}

function UniversalHeaderLink(_ref) {
  var to = _ref.to,
      href = _ref.href,
      label = _ref.label;
  var isInternal = href ? (0, _linksUtils.isInternalURL)(href) : (0, _linksUtils.isInternalURL)(to);

  if (isInternal) {
    return _react.default.createElement(_header.HeaderLink, {
      to: to || href
    }, label);
  } else {
    return _react.default.createElement(_header.HeaderLinkExternal, {
      href: to || href,
      target: "_blank"
    }, label);
  }
}

function UniversalLogoLink(_ref2) {
  var to = _ref2.to,
      label = _ref2.label;
  var isInternal = (0, _linksUtils.isInternalURL)(to);

  if (isInternal) {
    return _react.default.createElement(_header.HeaderLogo, {
      to: to
    }, label);
  } else {
    return _react.default.createElement(_header.HeaderLogoExternal, {
      href: to,
      target: "_blank"
    }, label);
  }
}

function generateHeaderLinks(props) {
  var _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config;
  var exampleLink = config.EXAMPLES && config.EXAMPLES.length > 0 && {
    label: 'Examples',
    to: '/examples'
  };
  var githubLink = config.PROJECT_TYPE === 'github' && {
    href: "https://github.com/".concat(config.PROJECT_ORG, "/").concat(config.PROJECT_NAME),
    label: _react.default.createElement(GithubLink, null)
  };
  var links = [exampleLink, {
    label: 'Documentation',
    to: config.HOME_PATH ? '/' : '/docs'
  }, {
    label: 'Search',
    to: '/search'
  }];

  if (config.ADDITIONAL_LINKS && config.ADDITIONAL_LINKS.length > 0) {
    config.ADDITIONAL_LINKS.map(function (link) {
      return _objectSpread(_objectSpread({}, link), {}, {
        label: link.name
      });
    }).forEach(function (link) {
      if (Number.isFinite(link.index)) {
        links.splice(link.index, 0, link);
      } else {
        links.push(link);
      }
    });
  }

  links.push(githubLink);
  return links.filter(Boolean);
}

var HeaderLinks = function HeaderLinks(_ref3) {
  var links = _ref3.links;
  return _react.default.createElement(_header.HeaderLinksBlock, null, links.map(function (link, index) {
    return _react.default.createElement(_header.HeaderLinkContainer, {
      key: "link-".concat(index)
    }, _react.default.createElement(UniversalHeaderLink, link));
  }));
};

var ControlledHeader = function ControlledHeader(_ref4) {
  var links = _ref4.links,
      _ref4$config = _ref4.config,
      config = _ref4$config === void 0 ? {} : _ref4$config,
      toggleMenu = _ref4.toggleMenu,
      toggleToc = _ref4.toggleToc,
      isTocOpen = _ref4.isTocOpen,
      isMenuOpen = _ref4.isMenuOpen,
      isSmallScreen = _ref4.isSmallScreen;
  var PROJECT_NAME = config.PROJECT_NAME,
      _config$PROJECTS = config.PROJECTS,
      PROJECTS = _config$PROJECTS === void 0 ? [] : _config$PROJECTS,
      _config$HEADER_LINK_U = config.HEADER_LINK_URL,
      HEADER_LINK_URL = _config$HEADER_LINK_U === void 0 ? '/' : _config$HEADER_LINK_U;
  var externalLinks = PROJECTS.map(function (_ref5) {
    var name = _ref5.name,
        url = _ref5.url;
    return _react.default.createElement(_header.HeaderMenuLink, {
      key: "menulink-".concat(name),
      href: url
    }, name);
  });

  var onClickHamburger = function onClickHamburger(event) {
    toggleMenu(!isMenuOpen);
    event.stopPropagation();
  };

  return isSmallScreen ? _react.default.createElement(_header.Header, {
    onClick: function onClick() {
      return toggleMenu(false);
    }
  }, _react.default.createElement(_header.HeaderMenuBlock, null, _react.default.createElement(UniversalLogoLink, {
    to: HEADER_LINK_URL,
    label: PROJECT_NAME
  }), _react.default.createElement(_header.HeaderMenu, {
    $collapsed: !isMenuOpen,
    $nbItems: links.length + 1
  }, _react.default.createElement(HeaderLinks, {
    links: links
  }))), toggleToc && _react.default.createElement(_header.TocToggle, {
    onClick: function onClick() {
      toggleMenu(false);
      toggleToc(!isTocOpen);
    }
  }, "Table of Contents"), _react.default.createElement(_header.HamburgerMenu, {
    onClick: onClickHamburger
  }), isMenuOpen && _react.default.createElement(_header.HeaderMenuBackground, null)) : _react.default.createElement(_header.Header, {
    onClick: function onClick() {
      return toggleMenu(false);
    }
  }, _react.default.createElement(_header.HeaderMenuBlock, null, _react.default.createElement(_header.HamburgerMenu, {
    onClick: onClickHamburger
  }), _react.default.createElement(UniversalLogoLink, {
    to: HEADER_LINK_URL,
    label: PROJECT_NAME
  }), _react.default.createElement(_header.HeaderMenu, {
    $collapsed: !isMenuOpen,
    $nbItems: PROJECTS.length
  }, externalLinks)), _react.default.createElement(HeaderLinks, {
    links: links
  }), isMenuOpen && _react.default.createElement(_header.HeaderMenuBackground, null));
};

var _default = ControlledHeader;
exports.default = _default;
//# sourceMappingURL=header.component.js.map