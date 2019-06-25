import * as React from 'react';

import classNames from 'classnames';

import './Stack.scss';

interface Props {
  /* Horizontal alignment */
  distribution?: 'center' | 'trailing';
  /* Vertical alignment */
  alignment?: 'center';
  vertical?: boolean;
  /* Defaults to 8px, spacing(tight) */
  spacing?: 'none';
  children: Object;
}

export default function Stack({
  distribution,
  alignment,
  vertical,
  spacing,
  children
}: Props) {
  const classes = classNames(
    'Stack',
    distribution && Distribution(distribution),
    alignment && Alignment(alignment),
    vertical && 'Vertical'
  );

  return (
    <div className={classes}>
      {React.Children.map(children, child => (
        <span className={spacing ? undefined : 'Stack__Item'}>{child}</span>
      ))}
    </div>
  );
}

function Distribution(distribution: Props['distribution']) {
  if (distribution == 'trailing') return 'HorizontalFlexEnd';
  if (distribution == 'center') return 'HorizontalCenter';
}

function Alignment(alignment: Props['alignment']) {
  if (alignment == 'center') return 'VerticalCenter';
}
