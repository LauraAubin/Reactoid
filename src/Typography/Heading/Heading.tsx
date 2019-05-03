import * as React from 'react';

export interface Props {
  color?: string;
}

export default class Heading extends React.Component<Props, any> {
  public render() {
    const { children, color = 'black' } = this.props;

    const colorStyle = {
      color: color,
      fontSize: '16px',
      fontWeight: 600
    };

    return <div style={colorStyle}>{children}</div>;
  }
}
