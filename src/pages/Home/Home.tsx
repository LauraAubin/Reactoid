import * as React from 'react';

import { css } from 'aphrodite';
import { Animations } from '../../animations/animations';
import { DisplayText } from '@shopify/polaris';
import { PURPLE, YELLOW } from '../../utilities/styles/themeColors';

import Icon from '../../components/Icon';
import Heading from '../../components/Typography/Heading';

import './Home.scss';

export default function Home() {
  const customButtonMarkup = (
    <a className='Option' href='/draw/'>
      <div className='IconBottomPadding'>
        <Icon name='paint' size='medium' color={PURPLE} />
      </div>
      <Heading color={PURPLE}>Custom</Heading>
    </a>
  );

  const libraryButtonMarkup = (
    <div className='Option'>
      <div className='IconBottomPadding'>
        <Icon name='penguin' size='medium' color={YELLOW} />
      </div>
      <Heading color={YELLOW}>Use existing</Heading>
    </div>
  );

  return (
    <div className={css(Animations.growFromCenter)}>
      <DisplayText size='medium'>
        How would you like to build your character?
      </DisplayText>

      <div className='OptionsContainer'>
        {customButtonMarkup}
        {libraryButtonMarkup}
      </div>
    </div>
  );
}
