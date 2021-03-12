import React, {PureComponent} from 'react';
import {render} from 'react-dom';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{color: 'red'}}>
        <p>This is a minimal React example</p>
        <p>Line...</p>
        <p>Line...</p>
        <p>Line...</p>
        <p>Line...</p>
      </div>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
