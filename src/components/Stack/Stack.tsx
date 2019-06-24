import * as React from 'react';

import classNames from 'classnames';

import './Stack.scss';

interface Props {
  /* Horizontal alignment */
  distribution?: 'center' | 'trailing';
  /* Vertical alignment */
  alignment?: 'center';
  children: any;
}

export default function Stack({ distribution, alignment, children }: Props) {
  const classes = classNames(
    'Stack',
    distribution && Distribution(distribution),
    alignment && Alignment(alignment)
  );

  return <div className={classes}>{children}</div>;
}

function Distribution(distribution: Props['distribution']) {
  if (distribution == 'trailing') return 'HorizontalFlexEnd';
  if (distribution == 'center') return 'HorizontalCenter';
}

function Alignment(alignment: Props['alignment']) {
  if (alignment == 'center') return 'VerticalCenter';
}
