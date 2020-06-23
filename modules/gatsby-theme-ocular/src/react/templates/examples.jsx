import React, {Component} from 'react';
import {withPrefix} from "gatsby"

import {MainExamples, ExampleCard, ExampleTitle} from '../styled/example';

export default class Examples extends Component {
  render() {
    const {
      pageContext: {examples}
    } = this.props;
    return (
      <MainExamples>
        {examples.map(exampleData => (
          <ExampleCard key={exampleData.title} to={`/${exampleData.path}`}>
            {exampleData.imageSrc ? (
              <img width="100%" src={withPrefix(exampleData.imageSrc)} alt={exampleData.title} />
            ) : null}
            <ExampleTitle><span>{exampleData.title}</span></ExampleTitle>
          </ExampleCard>
        ))}
      </MainExamples>
    );
  }
}
