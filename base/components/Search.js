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
        route.name && (route.name.match(query) || route.markdown.match(query))
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
