// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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
