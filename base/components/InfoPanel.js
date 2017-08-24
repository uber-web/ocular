import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import demos from 'demos';
import GenericInput from 'components/Input';

import {updateParams} from 'reducers/vis';

@connect(({vis}) => vis, {
  updateParams,
})
class InfoPanel extends Component {

  state = {
    hasFocus: false,
  }

  blurTimer = null

  onFocus = () => {
    window.clearTimeout(this.blurTimer);
    this.setState({hasFocus: true});
  }

  onBlur = () => {
    // New focus is not yet available when blur event fires.
    // Wait a bit and if no onfocus event is fired, remove focus
    this.blurTimer = window.setTimeout(() => {
      this.setState({hasFocus: false});
    }, 1);
  }

  render() {
    const {hasFocus} = this.state;
    const {demo, params, owner, meta} = this.props;

    const DemoComponent = demos[demo];
    const metaLoaded = owner === demo ? meta : {};

    return (
      <div
        className={cx('options-panel top-right', {focus: hasFocus})}
        tabIndex="0"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >

        {DemoComponent.renderInfo && DemoComponent.renderInfo(metaLoaded)}

        {Object.keys(params).length > 0 && <hr />}

        {Object.keys(params).map((name, i) => (
          <GenericInput
            key={i}
            name={name}
            {...params[name]}
            onChange={this.props.updateParam}
          />
        ))}

        {this.props.children}

      </div>
    );
  }
}

export default InfoPanel;
