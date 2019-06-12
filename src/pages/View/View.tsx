import * as React from 'react';

import { Link } from 'react-router-dom';

export default class View extends React.Component {
  public render() {
    return (
      <div>
        View
        <br />
        <Link to='/'>Home</Link>
        <br />
        <Link to='/draw/'>Draw</Link>
      </div>
    );
  }
}
