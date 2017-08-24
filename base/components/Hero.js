import React, {Component} from 'react';

import {PROJECT_NAME, PROJECT_DESC} from 'config';

class Hero extends Component {

  render() {
    return (
      <div className="Hero">

        <div className="container">
          <h1>{PROJECT_NAME}</h1>
          <p>{PROJECT_DESC}</p>
          <a href="#/documentation" className="btn">{'Get started'}</a>
        </div>

      </div>
    );
  }

}

export default Hero;
