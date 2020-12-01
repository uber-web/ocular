import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import GithubIcon from 'react-icons/lib/go/mark-github';
import { isInternalURL } from '../../utils/links-utils.js';
import { HamburgerMenu, Header as StyledHeader, HeaderLink, HeaderLinkExternal, HeaderLogo, HeaderLogoExternal, HeaderLinksBlock, HeaderLinkContainer, HeaderMenuBlock, HeaderMenu, HeaderMenuLink, HeaderMenuBackground, TocToggle } from '../styled/header';
export var propTypes = {
  config: PropTypes.object.isRequired
};

function GithubLink() {
  return React.createElement(React.Fragment, null, "GitHub", React.createElement(GithubIcon, {
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
  var isInternal = href ? isInternalURL(href) : isInternalURL(to);

  if (isInternal) {
    return React.createElement(HeaderLink, {
      to: to || href
    }, label);
  } else {
    return React.createElement(HeaderLinkExternal, {
      href: to || href,
      target: "_blank"
    }, label);
  }
}

function UniversalLogoLink(_ref2) {
  var to = _ref2.to,
      label = _ref2.label;
  var isInternal = isInternalURL(to);

  if (isInternal) {
    return React.createElement(HeaderLogo, {
      to: to
    }, label);
  } else {
    return React.createElement(HeaderLogoExternal, {
      href: to,
      target: "_blank"
    }, label);
  }
}

export function generateHeaderLinks(props) {
  var _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config;
  var exampleLink = config.EXAMPLES && config.EXAMPLES.length > 0 && {
    label: 'Examples',
    to: '/examples'
  };
  var githubLink = config.PROJECT_TYPE === 'github' && {
    href: "https://github.com/".concat(config.PROJECT_ORG, "/").concat(config.PROJECT_NAME),
    label: React.createElement(GithubLink, null)
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
  return React.createElement(HeaderLinksBlock, null, links.map(function (link, index) {
    return React.createElement(HeaderLinkContainer, {
      key: "link-".concat(index)
    }, React.createElement(UniversalHeaderLink, link));
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
    return React.createElement(HeaderMenuLink, {
      key: "menulink-".concat(name),
      href: url
    }, name);
  });

  var onClickHamburger = function onClickHamburger(event) {
    toggleMenu(!isMenuOpen);
    event.stopPropagation();
  };

  return isSmallScreen ? React.createElement(StyledHeader, {
    onClick: function onClick() {
      return toggleMenu(false);
    }
  }, React.createElement(HeaderMenuBlock, null, React.createElement(UniversalLogoLink, {
    to: HEADER_LINK_URL,
    label: PROJECT_NAME
  }), React.createElement(HeaderMenu, {
    $collapsed: !isMenuOpen,
    $nbItems: links.length + 1
  }, React.createElement(HeaderLinks, {
    links: links
  }))), toggleToc && React.createElement(TocToggle, {
    onClick: function onClick() {
      toggleMenu(false);
      toggleToc(!isTocOpen);
    }
  }, "Table of Contents"), React.createElement(HamburgerMenu, {
    onClick: onClickHamburger
  }), isMenuOpen && React.createElement(HeaderMenuBackground, null)) : React.createElement(StyledHeader, {
    onClick: function onClick() {
      return toggleMenu(false);
    }
  }, React.createElement(HeaderMenuBlock, null, React.createElement(HamburgerMenu, {
    onClick: onClickHamburger
  }), React.createElement(UniversalLogoLink, {
    to: HEADER_LINK_URL,
    label: PROJECT_NAME
  }), React.createElement(HeaderMenu, {
    $collapsed: !isMenuOpen,
    $nbItems: PROJECTS.length
  }, externalLinks)), React.createElement(HeaderLinks, {
    links: links
  }), isMenuOpen && React.createElement(HeaderMenuBackground, null));
};

export default ControlledHeader;
//# sourceMappingURL=header.component.js.map