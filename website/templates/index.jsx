import React from 'react';
import {Home} from 'ocular-gatsby/components';
import HeroExample from '../../examples/minimal/app';

export default class IndexPage extends React.Component {
  render() {
    return (
      <Home HeroExample={HeroExample}/>
    );
  }
}
