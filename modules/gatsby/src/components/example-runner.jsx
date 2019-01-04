import React, {Component} from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import {setPathPrefix} from 'luma.gl';

import InfoPanel from './info-panel';

const propTypes = {
  demo: PropTypes.object,
  canvas: PropTypes.string
};

const defaultProps = {};

const DEFAULT_ALT_TEXT = 'THIS EXAMPLE IS NOT SUPPORTED';

export default class ExampleRunner extends Component {
  componentDidMount() {
    // const {sourceLink} = this.props;
    // // Ensure the example can find its images
    // // TODO - ideally we should extract images from example source?
    // const RAW_GITHUB = 'https://raw.githubusercontent.com/uber/luma.gl/master';
    // setPathPrefix(`${RAW_GITHUB}/${sourceLink}`);

    // Start the actual example
    // TODO/ib - should this be kept in default component?
    if (this.props.demo.start) {
      this.props.demo.start({
        canvas: this.props.canvas
      });
    }
  }

  componentWillUnmount() {
    // TODO/ib - should this be kept in default component?
    this.props.demo.stop && this.props.demo.stop();
  }

  render() {
    const {width, height, name, demo, noPanel, sourceLink} = this.props;
    const controls = demo.getInfo && demo.getInfo();

    const notSupported = demo.isSupported && !demo.isSupported();

    if (notSupported) {
      const altText = demo.getAltText ? demo.getAltText() : DEFAULT_ALT_TEXT;
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <h2> {altText} </h2>
        </div>
      );
    }

    const Example = demo;

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
