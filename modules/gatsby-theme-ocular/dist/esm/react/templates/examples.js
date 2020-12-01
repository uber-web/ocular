import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { withPrefix } from 'gatsby';
import { MainExamples, ExamplesGroup, ExampleCard, ExampleHeader, ExampleTitle } from '../styled/example';

var Examples = function (_Component) {
  _inherits(Examples, _Component);

  var _super = _createSuper(Examples);

  function Examples() {
    _classCallCheck(this, Examples);

    return _super.apply(this, arguments);
  }

  _createClass(Examples, [{
    key: "renderExample",
    value: function renderExample(_ref) {
      var title = _ref.title,
          path = _ref.path,
          image = _ref.image;
      return React.createElement(ExampleCard, {
        key: title,
        to: "/".concat(path)
      }, image ? React.createElement("img", {
        width: "100%",
        src: withPrefix(image),
        alt: title
      }) : null, React.createElement(ExampleTitle, null, React.createElement("span", null, title)));
    }
  }, {
    key: "renderCategory",
    value: function renderCategory(item) {
      var _this = this;

      if (item.entries) {
        return [React.createElement(ExampleHeader, {
          key: "".concat(item.title, "-header")
        }, item.title), React.createElement(ExamplesGroup, {
          key: item.title
        }, item.entries.map(function (entry) {
          return _this.renderExample(entry);
        }))];
      }

      return this.renderExample(item);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var toc = this.props.pageContext.toc;

      if (toc.length === 1) {
        return React.createElement(MainExamples, null, React.createElement(ExamplesGroup, null, toc[0].entries.map(function (entry) {
          return _this2.renderExample(entry);
        })));
      }

      return React.createElement(MainExamples, null, toc.map(function (exampleData) {
        return _this2.renderCategory(exampleData);
      }));
    }
  }]);

  return Examples;
}(Component);

export { Examples as default };
//# sourceMappingURL=examples.js.map