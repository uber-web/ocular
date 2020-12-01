"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _tableOfContents = _interopRequireDefault(require("./table-of-contents.component"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isOpen(entry, expanded) {
  return expanded[entry.id] === true || entry.childIsSelected && expanded[entry.id] !== false;
}

function updateHeights(tocEntries, expanded) {
  Object.values(tocEntries).forEach(function (tocEntry) {
    if (tocEntry.children) {
      if (isOpen(tocEntry, expanded)) {
        (function () {
          var queue = [tocEntry];
          var height = -1;

          while (queue.length) {
            var current = queue.shift();
            height = height + 1;

            if (isOpen(current, expanded)) {
              current.children.forEach(function (c) {
                return queue.push(tocEntries[c]);
              });
            }
          }

          tocEntry.height = height;
        })();
      } else {
        tocEntry.height = 0;
      }
    }
  });
  return tocEntries;
}

function getTocState(_ref) {
  var chapters = _ref.chapters,
      slug = _ref.slug,
      expanded = _ref.expanded;
  var entries = {};
  var queue = chapters.map(function (chapter, i) {
    return _objectSpread(_objectSpread({}, chapter), {}, {
      id: [i],
      parents: []
    });
  });

  var _loop = function _loop() {
    var current = queue.shift();
    var id = current.id;
    entries[id] = {
      id: id
    };
    var children = (current.chapters || current.entries || []).map(function (child, i) {
      return _objectSpread(_objectSpread({}, child), {}, {
        id: id.concat(i),
        parents: [].concat((0, _toConsumableArray2.default)(current.parents), [id])
      });
    });

    if (children.length) {
      entries[id].children = children.map(function (c) {
        return c.id;
      });
    }

    children.forEach(function (c) {
      return queue.push(c);
    });
    var isSelected = current.childMdx ? current.childMdx.fields.slug === slug : current.path === slug;

    if (isSelected) {
      current.parents.forEach(function (parent) {
        entries[parent].childIsSelected = true;
      });
    }

    entries[id].isSelected = isSelected;
  };

  while (queue.length) {
    _loop();
  }

  return updateHeights(entries, expanded);
}

var TableOfContents = function (_PureComponent) {
  (0, _inherits2.default)(TableOfContents, _PureComponent);

  var _super = _createSuper(TableOfContents);

  function TableOfContents(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TableOfContents);
    _this = _super.call(this, props);
    var slug = props.slug,
        chapters = props.chapters,
        firstItemIsExpanded = props.firstItemIsExpanded;
    var expanded = firstItemIsExpanded ? {
      0: true
    } : {};
    var tocState = getTocState({
      slug: slug,
      chapters: chapters,
      expanded: expanded
    });
    _this.state = {
      tocState: tocState,
      expanded: expanded
    };
    _this.toggleEntry = _this.toggleEntry.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(TableOfContents, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          chapters = _this$props.chapters,
          slug = _this$props.slug,
          firstItemIsExpanded = _this$props.firstItemIsExpanded;

      if (slug !== prevProps.slug || chapters !== prevProps.chapters) {
        var expanded = chapters === prevProps.chapters ? this.state.expanded : firstItemIsExpanded ? {
          0: true
        } : {};
        var tocState = getTocState({
          chapters: chapters,
          slug: slug,
          expanded: expanded
        });
        this.setState({
          tocState: tocState,
          expanded: expanded
        });
      }
    }
  }, {
    key: "toggleEntry",
    value: function toggleEntry(id) {
      var _this$state = this.state,
          expanded = _this$state.expanded,
          tocState = _this$state.tocState;

      var updatedExpanded = _objectSpread({}, expanded);

      var entry = tocState[id];
      updatedExpanded[id] = !isOpen(entry, expanded);
      var updatedTocState = updateHeights(_objectSpread({}, tocState), updatedExpanded);
      this.setState({
        tocState: updatedTocState,
        expanded: updatedExpanded
      });
    }
  }, {
    key: "render",
    value: function render() {
      var tree = this.props.chapters;
      var tocState = this.state.tocState;

      if (!tree) {
        return null;
      }

      return _react.default.createElement(_tableOfContents.default, {
        tree: tree,
        tocState: tocState,
        toggleEntry: this.toggleEntry
      });
    }
  }]);
  return TableOfContents;
}(_react.PureComponent);

exports.default = TableOfContents;
//# sourceMappingURL=table-of-contents.js.map