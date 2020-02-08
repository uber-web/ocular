import React from 'react';
import debounce from 'lodash.debounce';
import SearchIcon from '../components/search';

import WebsiteConfigConsumer from '../components/website-config';
import {
  MainSearch,
  SearchContainer,
  IconContainer,
  SearchInput,
  SearchResultItem,
  SearchResultLink,
  SearchResultContent
} from '../styled/search';

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
    const {lastQuery} = this.state;
    const {pathContext} = this.props;
    this.setState({debouncing: false});
    if (currentQuery === lastQuery) {
      return;
    }
    let results;
    if (currentQuery) {
      const regex = new RegExp(currentQuery, 'i');
      const headingRegex = new RegExp(`^#.*${currentQuery}`, 'im');

      // Sort order:
      // appearance in title
      results = pathContext.data.filter(
        node => node.title && regex.test(node.title)
      );

      // appearance in headings
      results = results.concat(pathContext.data.filter(
        node =>
          !results.includes(node) &&
          node.rawMarkdownBody && headingRegex.test(node.rawMarkdownBody)
      ));

      // any appearance
      results = results.concat(pathContext.data.filter(
        node =>
          !results.includes(node) &&
          node.rawMarkdownBody && regex.test(node.rawMarkdownBody)
      ));
    } else {
      results = [];
    }
    this.setState({results, lastQuery: currentQuery});
  }

  handleChange(event) {
    const currentQuery = event.target.value;
    this.setState({currentQuery, debouncing: true});
    this.findResults(currentQuery);
  }

  renderPage() {
    // Note: The Layout "wrapper" component adds header and footer etc
    const {debouncing, results, currentQuery} = this.state;
    const {pathContext} = this.props;
    return (
      <MainSearch>
        <SearchContainer>
          <IconContainer>
            <SearchIcon width={24} height={24} />
          </IconContainer>
          <SearchInput
            type="text"
            placeholder="Search"
            onChange={this.handleChange}
            value={currentQuery}
          />
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
          <div>
            {results.map(result => (
              <SearchResultItem key={result.slug}>
                <SearchResultLink to={result.slug}>{result.title}</SearchResultLink>
                <SearchResultContent>{result.excerpt}</SearchResultContent>
              </SearchResultItem>
            ))}
          </div>
        </div>
      </MainSearch>
    );
  }

  render() {
    return (
      <WebsiteConfigConsumer>{() => this.renderPage()}</WebsiteConfigConsumer>
    );
  }
}
