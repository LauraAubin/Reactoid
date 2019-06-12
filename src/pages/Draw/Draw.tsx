import * as React from 'react';

import { Link } from 'react-router-dom';

export default class Draw extends React.Component {
  public render() {
    return (
      <div>
        Draw Page
        <br></br>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
