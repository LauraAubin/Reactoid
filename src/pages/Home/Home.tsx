import * as React from 'react';

import { DisplayText } from '@shopify/polaris';
import { PURPLE, YELLOW } from '../../globalStyles/themeColors';

import Icon from '../../components/Icon';
import Heading from '../../components/Typography/Heading';

import './Home.scss';

export default function Home() {
  return (
    <>
      <DisplayText size='medium'>
        How would you like to build your character?
      </DisplayText>
      <div className='OptionsContainer'>
        <a className='Option' href='/draw/'>
          <div className='IconBottomPadding'>
            <Icon name='paint' size='medium' color={PURPLE} />
          </div>
          <Heading color={PURPLE}>Custom</Heading>
        </a>
        <div className='Option'>
          <div className='IconBottomPadding'>
            <Icon name='penguin' size='medium' color={YELLOW} />
          </div>
          <Heading color={YELLOW}>Use existing</Heading>
        </div>
      </div>
    </>
  );
}
