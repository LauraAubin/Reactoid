import * as React from 'react';

import { Link } from 'react-router-dom';

export default class EmptyState extends React.Component {
  public render() {
    return (
      <div>
        Empty State
        <br />
        <Link to='/'>Home</Link>
      </div>
    );
  }
}
