import * as React from 'react';

import './Page.scss';

interface Props {
  children: any;
}

export default function Page({ children }: Props) {
  return (
    <div className='Page'>
      <div className='PageContent'>{children}</div>
    </div>
  );
}
