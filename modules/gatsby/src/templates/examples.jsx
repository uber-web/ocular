import React, {Component} from 'react';
import {Link} from 'gatsby';

import {MainExamples, ExampleCard, ExampleTitle} from '../components/styled';
// import ExampleTableOfContents from '../components/layout/example-table-of-contents';

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
      pageContext: {examples}
    } = this.props;
    return (
      <MainExamples>
        {examples.map(exampleData => (
          <ExampleCard key={exampleData.title}>
            <Link to={`/${exampleData.path}`}>
              {exampleData.imageSrc ? (
                <img src={exampleData.imageSrc} alt={exampleData.title} />
              ) : null}
              <ExampleTitle>{exampleData.title}</ExampleTitle>
            </Link>
          </ExampleCard>
        ))}
      </MainExamples>
    );
  }
}
