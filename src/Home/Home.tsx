import * as React from 'react';

import { DisplayText } from '@shopify/polaris';

import Icon from './components/Icon/Icon';
import Heading from "../Typography/Heading";

import './Home.scss';

export default class Home extends React.Component {
  public render() {
    const purple = "#6052b2";
    const yellow = "#ffe787";

    return (
      <div className='Layout'>
        <DisplayText size='medium'>
          How would you like to build your character?
        </DisplayText>
        <div className='OptionsContainer'>
          <div className='Option'>
            <Icon name='folder' size='medium' color={purple} />
            <Heading color={purple}>Custom</Heading>
          </div>
          <div className='Option'>
            <Icon name='penguin' size='medium' color={yellow} />
            <Heading color={yellow}>Use existing</Heading>
          </div>
        </div>
      </div>
    );
  }
}
