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

import Hero from 'components/Hero';
import Footer from 'components/Footer';
import {HOME_HEADING, HOME_RIGHT, HOME_BULLETS, PROJECT_TYPE} from 'config';

@connect(({github}) => ({
  contributors: github.loaded ? github.contributors : [...Array(16)],
}))
class Home extends Component {

  render() {
    const {contributors} = this.props;

    return (
      <div className="fg">

        <Hero />

        <div className="fg p4">

          <div className="container f fw">

            <div className="f1 p" style={{minWidth: '10rem'}}>

              <h2>
                {HOME_HEADING}
              </h2>

              <hr className="short" />

              {HOME_BULLETS.map((bull, i) => (
                <div key={i}>
                  <h3 className="fac">
                    <img src={bull.img} className="m-right" />
                    {bull.text}
                  </h3>
                  {bull.desc && (
                    <p>
                      {bull.desc}
                    </p>
                  )}
                </div>
              ))}

            </div>

            <div className="f1 p" style={{minWidth: '10rem'}}>
              {HOME_RIGHT}
            </div>

          </div>

          {PROJECT_TYPE === 'github' && (
            <div className="container">

              <hr className="short" />
              <h3>{'Contributors'}</h3>
              <span>{'Join us!'}</span>

              <div className="Contributors m-top">
                {contributors.map((contributor, i) => contributor ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={contributor.html_url}
                    className="Contributor"
                    key={contributor.id}
                  >
                    <img src={contributor.avatar_url} width="100%" />
                    <span>
                      {contributor.login}
                    </span>
                  </a>
                ) : (
                  <div className="Contributor" key={i} />
                ))}
              </div>

            </div>
          )}

        </div>

        <Footer />

      </div>
    );
  }

}

export default Home;
