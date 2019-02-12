import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { graphql } from 'gatsby';

import ExampleTableOfContents from '../components/layout/example-table-of-contents';

const Gallery = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 96px);
  @media screen and (max-width: 600px) {
    margin-top: 64px;
  }
`;

const ExampleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f7f7f7;
  border-radius: 4px;
  width: 180px;
  height: 180px;
  margin: 10px;
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
    const { examples } = this.props.pageContext;
    return (
      <Gallery>
        {examples.map(exampleData => (
          <ExampleCard>
            <Link to={exampleData.path}>
              <img src={exampleData.imageSrc} height={150} width={150} />
              {exampleData.title}
            </Link>
          </ExampleCard>
        ))}
      </Gallery>
    );
  }
}
