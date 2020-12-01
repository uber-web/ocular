import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import SiteQuery from './site-query';
import TopLevelLayout from './templates/top-level-layout';
export default function wrapPage(_ref) {
  var element = _ref.element,
      props = _ref.props;

  var onQueryComplete = function onQueryComplete(data) {
    var config = data.site.siteMetadata.config,
        tableOfContents = data.tableOfContents;
    return React.createElement(TopLevelLayout, _extends({}, props, {
      config: config,
      tableOfContents: tableOfContents
    }), element);
  };

  return React.createElement(SiteQuery, null, onQueryComplete);
}
//# sourceMappingURL=wrap-page.js.map