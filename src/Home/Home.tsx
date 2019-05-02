import * as React from 'react';

import { DisplayText, Heading } from '@shopify/polaris';

import Icon from './components/Icon';

import './Home.scss';

export default class Home extends React.Component {
  public render() {
    return (
      <div className='Layout'>
        <DisplayText size='medium'>
          How would you like to build your character?
        </DisplayText>
        <div className='OptionsContainer'>
          <div className='Option'>
            <Icon name='folder' size='medium' />
            <Heading>Custom</Heading>
          </div>
          <div className='Option'>
            <Icon name='penguin' size='medium' />
            <Heading>Use existing</Heading>
          </div>
        </div>
      </div>
    );
  }
}
