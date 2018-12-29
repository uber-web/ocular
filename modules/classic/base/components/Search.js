// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import debounce from 'lodash.debounce';

import {setSearch} from 'reducers/ui';
import Markdown from 'components/Markdown';
import routes from 'routes';

@connect(({ui: {search: {results, query}}}) => ({
  results,
  query,
}), {
  setSearch,
})
class Search extends Component {

  state = {query: this.props.query, debouncing: false}

  commit = debounce(() => {
    const {query} = this.state;
    this.setState({debouncing: false});

    if (query === this.props.query) { return; }

    const results = query
      ? routes.filter(route =>
        (route.name && route.name.match(query)) || (route.markdown && route.markdown.match(query))
      )
      : [];

    this.props.setSearch({results, query});
  }, 250)

  change = e => {
    this.setState({query: e.target.value, debouncing: true});
    this.commit();
  }

  render() {
    const {query, debouncing} = this.state;
    const {results} = this.props;

    return (
      <div className="fcol f fg container p2">

        <input
          type="text"
          placeholder="Search"
          onChange={this.change}
          value={query}
          className="search-input m-bottom"
        />

        <div>
          {!results.length && query && !debouncing && (
            <div>{'No result for this query.'}</div>
          )}

          {!query && !debouncing && (
            <div>{'Please start typing!'}</div>
          )}

          {results.map(result => (
            <div className="search-item" key={result.path}>
              <div className="search-title">
                <Link to={result.path}>{result.name}</Link>
              </div>
              <div className="search-content">
                <Markdown markdown={result.markdown} textOnly />
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

}

export default Search;
