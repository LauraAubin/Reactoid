import * as React from 'react';

interface Props {
  color?: string;
  children: any;
}

export default function Heading({ color, children }: Props) {
  const colorStyle = {
    color: color = color,
    fontSize: '16px',
    fontWeight: 600
  };

  return <div style={colorStyle}>{children}</div>;
}
