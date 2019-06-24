import * as React from 'react';

import classNames from 'classnames';

import './Section.scss';

interface Props {
  subdued?: boolean;
  /* Removes inner padding */
  noPadding?: boolean;
  children: any;
}

export default function Section({ subdued, noPadding, children }: Props) {
  const classes = classNames(
    'Section',
    subdued && 'Subdued',
    noPadding && 'NoPadding'
  );

  return <div className={classes}>{children}</div>;
}
