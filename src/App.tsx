import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider, Page } from '@shopify/polaris';
import { PURPLE } from './globalStyles/colors';

import GithubCorner from 'react-github-corner';

import EmptyState from './pages/EmptyState';
import Draw from './pages/Draw';
import Home from './pages/Home';
import View from './pages/View';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <AppProvider>
          <Page title=''>
            <GithubCorner
              href='https://github.com/LauraAubin/Reactoid'
              bannerColor={PURPLE}
              size={100}
            />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/draw/' component={Draw} />
              <Route path='/view/' component={View} />
              <Route component={EmptyState} />
            </Switch>
          </Page>
        </AppProvider>
      </Router>
    );
  }
}

export default App;
