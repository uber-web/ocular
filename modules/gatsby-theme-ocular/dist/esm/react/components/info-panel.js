import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import { PanelContainer, PanelContent, PanelTitle, PanelExpander, SourceLink } from '../styled/example';

var InfoPanel = function (_PureComponent) {
  _inherits(InfoPanel, _PureComponent);

  var _super = _createSuper(InfoPanel);

  function InfoPanel(props) {
    var _this;

    _classCallCheck(this, InfoPanel);

    _this = _super.call(this, props);
    _this.state = {
      isExpanded: false
    };
    return _this;
  }

  _createClass(InfoPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          title = _this$props.title,
          children = _this$props.children,
          sourceLink = _this$props.sourceLink;
      var isExpanded = this.state.isExpanded;
      return React.createElement(PanelContainer, null, React.createElement(PanelTitle, {
        onClick: function onClick() {
          return _this2.setState({
            isExpanded: !isExpanded
          });
        }
      }, React.createElement("div", null, title), React.createElement(PanelExpander, {
        $expanded: isExpanded
      }, isExpanded ? '✕' : 'i')), React.createElement(PanelContent, {
        $expanded: isExpanded
      }, children), React.createElement(SourceLink, {
        $expanded: isExpanded,
        href: sourceLink,
        target: "_new"
      }, "View Code \u2197"));
    }
  }]);

  return InfoPanel;
}(PureComponent);

export { InfoPanel as default };
//# sourceMappingURL=info-panel.js.map