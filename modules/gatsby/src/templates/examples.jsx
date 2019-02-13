import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { graphql } from 'gatsby';

import ExampleTableOfContents from '../components/layout/example-table-of-contents';

const colors = {
  black: '#000',
  gray6: '#f6f6f6',
  white: '#fff'
};

const Main = styled.main`
  background: ${colors.white};
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    margin-top: 64px;
  }
`;

const ExampleCard = styled.div`
  border: 1px solid ${colors.gray6};
  cursor: pointer;
  margin: 10px;
  padding: 20px 16px;
  transition: background 0.3s border-color 0.3s;
  &:hover {
    background: ${colors.gray6};
    border-color: transparent;
  }
`;

const ExampleTitle = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
`;

/* eslint no-undef: "off" */

/*
class Gallery extends Component {

  render() {
    // const {children, route: {path, pages}, isMenuOpen} = this.props;

    return (
      <div className="gallery-wrapper">
        { /* TODO - add thumbnails
        <div className={'flexbox-item flexbox-item--fill'}>
          { children }
        </div>
        * }
      </div>
    );
  }
}
*/

export default class Examples extends Component {
  render() {
    const {
      pageContext: { examples }
    } = this.props;
    return (
      <Main>
        {examples.map(exampleData => (
          <ExampleCard>
            <Link to={exampleData.path}>
              <img src={exampleData.imageSrc} alt={exampleData.title} />
              <ExampleTitle>{exampleData.title}</ExampleTitle>
            </Link>
          </ExampleCard>
        ))}
      </Main>
    );
  }
}
