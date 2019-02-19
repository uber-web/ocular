import React from 'react';
import debounce from 'lodash.debounce';
import { Link } from 'gatsby';
import SearchIcon from '../components/images/search-filled.svg';
import WithConfig from '../components/layout/website-config';

import WebsiteConfigConsumer from '../components/layout/website-config';
import {
  MainSearch,
  SearchContainer,
  IconContainer,
  InputSearch
} from '../components/styled';
// import { setHeaderOpacity } from '../../../classic/base/reducers/ui';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuery: '',
      lastQuery: '',
      results: []
    };
    this.findResults = debounce(this.findResults.bind(this), 250);
    this.handleChange = this.handleChange.bind(this);
  }

  findResults(currentQuery) {
    const { lastQuery } = this.state;
    const { pathContext } = this.props;
    this.setState({ debouncing: false });
    if (currentQuery === lastQuery) {
      return;
    }
    const results = currentQuery
      ? pathContext.data.filter(
          node =>
            (node.title && node.title.match(currentQuery)) ||
            (node.rawMarkdownBody && node.rawMarkdownBody.match(currentQuery))
        )
      : [];
    this.setState({ results, lastQuery: currentQuery });
  }

  handleChange(event) {
    const currentQuery = event.target.value;
    this.setState({ currentQuery, debouncing: true });
    this.findResults(currentQuery);
  }

  renderPage() {
    // Note: The Layout "wrapper" component adds header and footer etc
    const { debouncing, results, currentQuery } = this.state;
    const { pathContext } = this.props;
    return (
      <WithConfig>
        {({ theme }) => (
          <MainSearch theme={theme}>
            <div className="fcol f fg container p2">
              <SearchContainer theme={theme}>
                <IconContainer theme={theme}>
                  <img src={SearchIcon} alt="search" height="16" width="16" />
                </IconContainer>
                <div className="fg">
                  <InputSearch
                    type="text"
                    placeholder="Search"
                    onChange={this.handleChange}
                    value={currentQuery}
                    theme={theme}
                    style={{ width: '100%' }}
                  />
                </div>
              </SearchContainer>

              {debouncing ? <div>Searching...</div> : null}
              <div>
                {currentQuery && !debouncing && (
                  <div>
                    {results.length
                      ? `${results.length} articles found.`
                      : `No result for this query.`}
                  </div>
                )}

                {!currentQuery && !debouncing && (
                  <div>
                    {pathContext.data
                      ? `${pathContext.data.length} articles indexed.`
                      : ''}
                  </div>
                )}
                <div className="results">
                  {results.map(result => (
                    <div className="search-item" key={result.slug}>
                      <div className="search-title">
                        <Link to={result.slug}>{result.title}</Link>
                      </div>
                      <div className="search-content">{result.excerpt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MainSearch>
        )}
      </WithConfig>
    );
  }

  render() {
    return (
      <WebsiteConfigConsumer>{() => this.renderPage()}</WebsiteConfigConsumer>
    );
  }
}
