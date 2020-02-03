import React from 'react';

import {MainExample} from '../styled/example';
import {getExamples} from '../utils/example-registry';

export default class ExampleTemplate extends React.Component {
  render() {
    const {pathContext} = this.props;
    const {slug} = pathContext;

    // Get app website's example runner
    const EXAMPLES = getExamples();
    const Example = EXAMPLES[slug];
    if (!Example) {
      console.warn(`No example found: ${slug}`);
    }
    // console.log(example);

    return Example && (
      <MainExample>
        <Example />
      </MainExample>
    );
  }
}
