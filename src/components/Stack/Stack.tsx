import * as React from 'react';

import classNames from 'classnames';

import './Stack.scss';

interface Props {
  /* Horizontal alignment */
  distribution?: 'center' | 'trailing' | 'spaceBetween';
  /* Vertical alignment */
  alignment?: 'center';
  vertical?: boolean;
  /* Child spacing defaults to 16px, spacing()
  Depends on vertical for padding direction */
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
  const stackClasses = classNames(
    'Stack',
    distribution && Distribution(distribution),
    alignment && Alignment(alignment),
    vertical && 'Vertical'
  );

  const childClasses = classNames(
    'Stack__Item',
    spacing !== 'none' && childSpacing(vertical)
  );

  return (
    <div className={stackClasses}>
      {React.Children.map(children, child => (
        <span className={childClasses}>{child}</span>
      ))}
    </div>
  );
}

function Distribution(distribution: Props['distribution']) {
  if (distribution == 'trailing') return 'HorizontalFlexEnd';
  if (distribution == 'center') return 'HorizontalCenter';
  if (distribution == 'spaceBetween') return 'HorizontalSpaceBetween';
}

function Alignment(alignment: Props['alignment']) {
  if (alignment == 'center') return 'VerticalCenter';
}

function childSpacing(vertical?: boolean) {
  return vertical
    ? 'Stack__Item--VerticalSpacing'
    : 'Stack__Item--HorizontalSpacing';
}
