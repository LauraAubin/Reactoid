import * as React from 'react';

import { Icon } from '@shopify/polaris';

import Card from '../../../../components/Card';
import Stack from '../../../../components/Stack';

import './Footer.scss';

export default function Footer() {
  const link = (
    <a className='Link' href='/view/'>
      <div className='ResultsButton'>
        <Stack distribution='spaceBetween' alignment='center'>
          <span>View result</span>
          <Icon source='arrowRight' color='white' />
        </Stack>
      </div>
    </a>
  );

  return (
    <Card openEdges={['bottom']}>
      <Card.Section>
        <Stack spacing='none' distribution='center'>
          {link}
        </Stack>
      </Card.Section>
    </Card>
  );
}
