import React, {Component} from 'react';
import {connect} from 'react-redux';

import Hero from 'components/Hero';

@connect(({github}) => ({
  contributors: github.loaded ? github.contributors : [...Array(16)],
}))
class Home extends Component {

  render() {
    const {contributors} = this.props;

    return (
      <div className="fg">

        <Hero />

        <div className="fg p4 mv2">

          <div className="container f">

            <div className="f1">

              <h2>
                {'Collection of Components and React-Utilities under the Visualization umbrella.'}
              </h2>

              <hr className="short" />

              <h3 className="fac">
                <img src="images/icon-react.svg" className="m-right" />
                {'Designed for React'}
              </h3>
              <p>
                {'Seemless integration.'}
              </p>

              <h3 className="fac">
                <img src="images/icon-layers.svg" className="m-right" />
                {'Battle tested'}
              </h3>
              <p>
                {'Totally ready for production.'}
              </p>

            </div>

            <div className="f1 hide-mobile">
              {'IMAGE'}
            </div>

          </div>

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

        </div>

      </div>
    );
  }

}

export default Home;
