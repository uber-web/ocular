import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import Markdown from '../components/markdown';
import { MarkdownBody } from '../styled/typography';

var PageTemplate = function (_React$Component) {
  _inherits(PageTemplate, _React$Component);

  var _super = _createSuper(PageTemplate);

  function PageTemplate() {
    _classCallCheck(this, PageTemplate);

    return _super.apply(this, arguments);
  }

  _createClass(PageTemplate, [{
    key: "render",
    value: function render() {
      var content = this.props.pageContext.content;
      return React.createElement("div", {
        style: {
          position: 'relative'
        }
      }, React.createElement(MarkdownBody, null, React.createElement(Markdown, {
        path: this.props.location.pathname,
        body: content.body
      })));
    }
  }]);

  return PageTemplate;
}(React.Component);

export { PageTemplate as default };
//# sourceMappingURL=page.js.map