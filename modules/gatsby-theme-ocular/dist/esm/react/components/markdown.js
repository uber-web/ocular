import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["href"],
    _excluded2 = ["children"],
    _excluded3 = ["id"];
import React, { cloneElement } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { A, GatsbyA, CodeBlock, H1, H2, H3, H4, H5, H6, InlineCode, P, List, ListItem, Pre, Img, BlockQuote, Table, TableHeaderCell, TableBodyCell } from '../styled/typography';
import { parseLinks } from '../../utils/links-utils.js';

var CustomLinkWrapper = function CustomLinkWrapper(path, relativeLinks, config) {
  var CustomLink = function CustomLink(_ref) {
    var href = _ref.href,
        props = _objectWithoutProperties(_ref, _excluded);

    var updatedLink = parseLinks(href, path, relativeLinks, config);
    return updatedLink ? React.createElement(GatsbyA, _extends({
      to: updatedLink
    }, props)) : React.createElement(A, _extends({
      href: href
    }, props));
  };

  return CustomLink;
};

var CustomPre = function CustomPre(props) {
  var children = props.children,
      otherProps = _objectWithoutProperties(props, _excluded2);

  return React.createElement(Pre, otherProps, React.Children.map(children, function (child) {
    if (child.type === 'code' || child.type.displayName === 'Styled(code)') {
      return React.createElement(CodeBlock, child.props);
    }

    return React.cloneElement(child);
  }));
};

var API_REGEX = /^code-classlanguage-text(.*?)code/;
var CODE_REGEX = /code-classlanguage-text(.*?)code/g;

var CustomHeader = function CustomHeader(ComponentType, id, props, anchors) {
  if (!id) {
    return React.createElement(ComponentType, props);
  }

  if (API_REGEX.test(id)) {
    id = id.match(API_REGEX)[1];
  } else {
    id = id.replace(CODE_REGEX, function ($0, $1) {
      return $1;
    });
  }

  if (anchors[id]) {
    var suffix = 1;

    while (anchors["".concat(id, "-").concat(suffix)]) {
      suffix++;
    }

    id = "".concat(id, "-").concat(suffix);
  }

  anchors[id] = true;
  var children = props.children.slice();
  var autolink = children[0];

  if (autolink.props && autolink.props.href) {
    children[0] = cloneElement(autolink, {
      key: 'anchor',
      href: "#".concat(id)
    });
  }

  return React.createElement(ComponentType, _extends({}, props, {
    id: id
  }), children);
};

export default (function (props) {
  var relativeLinks = props.relativeLinks,
      path = props.path,
      config = props.config;
  var anchors = {};

  var HeaderWrapper = function HeaderWrapper(ComponentType) {
    return function (_ref2) {
      var id = _ref2.id,
          props = _objectWithoutProperties(_ref2, _excluded3);

      return CustomHeader(ComponentType, id, props, anchors);
    };
  };

  var components = {
    h1: H1,
    h2: HeaderWrapper(H2),
    h3: HeaderWrapper(H3),
    h4: HeaderWrapper(H4),
    h5: HeaderWrapper(H5),
    h6: HeaderWrapper(H6),
    p: P,
    ul: List,
    li: ListItem,
    pre: CustomPre,
    img: Img,
    code: InlineCode,
    table: Table,
    th: TableHeaderCell,
    td: TableBodyCell,
    blockquote: BlockQuote,
    a: relativeLinks ? CustomLinkWrapper(path, relativeLinks, config) : A
  };
  return React.createElement(MDXProvider, {
    components: components
  }, React.createElement(MDXRenderer, null, props.body));
});
//# sourceMappingURL=markdown.js.map