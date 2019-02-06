import React from 'react';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import { Link } from 'gatsby';
import SearchIcon from '../components/images/search-filled.svg';

import WebsiteConfigConsumer from '../components/layout/website-config';

const SearchContainer = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 20px;
  background: #f7f7f7;
`;
const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;
const Input = styled.input`
  box-shadow: rgba(0, 0, 0, 0) 0px 2px 6px;
  border: 1px solid transparent;
  transition: 0.3s;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 10px 10px 10px 40px;
  :focus {
    box-shadow: rgba(39, 110, 241, 0.32) 0px 2px 6px;
    border-color: rgb(39, 110, 241);
    outline: none;
  }
`;

const Main = styled.main`
  max-width: 600px;
  margin: 104px auto 0px;
`;
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
      <Main>
        <div className="fcol f fg container p2">
          <SearchContainer>
            <IconContainer>
              <img src={SearchIcon} alt="search" height="16" width="16" />
            </IconContainer>
            <div className="fg">
              <Input
                type="text"
                placeholder="Search"
                onChange={this.handleChange}
                value={currentQuery}
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
      </Main>
    );
  }

  render() {
    return (
      <WebsiteConfigConsumer>{() => this.renderPage()}</WebsiteConfigConsumer>
    );
  }
}
