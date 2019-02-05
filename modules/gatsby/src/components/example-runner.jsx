import React, {Component} from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

import InfoPanel from './info-panel';

const propTypes = {
  example: PropTypes.object.isRequired,
  canvas: PropTypes.string // optional
};

const defaultProps = {};

const DEFAULT_ALT_TEXT = 'THIS EXAMPLE IS NOT SUPPORTED';

export default class ExampleRunner extends Component {
  componentDidMount() {
    const {onStart, example, canvas} = this.props;

    // Can e.g. be used to ensure the example can find its images

    if (onStart) {
      onStart({
        example,
        canvas
      });
    }

    if (example && example.start) {
      example.start({
        example,
        canvas
      });
    }
  }

  componentWillUnmount() {
    const {onStop, example, canvas} = this.props;

    if (onStop) {
      onStop({
        example,
        canvas
      });
    }

    if (example && example.stop) {
      example.stop({
        example,
        canvas
      });
    }
  }

  render() {
    console.log(this.props);
    const {width, height, name, example, noPanel, sourceLink} = this.props;
    const controls = example.getInfo && example.getInfo();

    const notSupported = example.isSupported && !example.isSupported();

    if (notSupported) {
      const altText = example.getAltText ? example.getAltText() : DEFAULT_ALT_TEXT;
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <h2> {altText} </h2>
        </div>
      );
    }

    const Example = example;

    return (
      <div className="fg" style={{width, height, padding: 0, border: 0}}>
        <Example style={{width: '100%', height: '100%', padding: 0, border: 0}}/>
        {noPanel ? null : <InfoPanel name={name} controls={controls} sourceLink={sourceLink} />}
      </div>
    );
  }
}

ExampleRunner.propTypes = propTypes;
ExampleRunner.defaultProps = defaultProps;
