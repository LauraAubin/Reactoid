import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider, Page } from '@shopify/polaris';

import EmptyState from './pages/EmptyState';
import Draw from './pages/Draw';
import Home from './pages/Home';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <AppProvider>
          <Page title=''>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/draw/' component={Draw} />
              <Route component={EmptyState} />
            </Switch>
          </Page>
        </AppProvider>
      </Router>
    );
  }
}

export default App;
