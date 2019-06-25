import * as React from 'react';

import { Link } from 'react-router-dom';

import Card from '../../../../components/Card';
import Stack from '../../../../components/Stack';

export default function Footer() {
  return (
    <Card openEdges={['bottom']}>
      <Card.Section>
        <Stack spacing='none' distribution='center'>
          <Link to='/view/'>View</Link>
        </Stack>
      </Card.Section>
    </Card>
  );
}
