import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import { PURPLE } from './globalStyles/themeColors';

import GithubCorner from 'react-github-corner';
import Page from './components/Page';

import EmptyState from './pages/EmptyState';
import Draw from './pages/Draw';
import Home from './pages/Home';
import View from './pages/View';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <AppProvider>
          <Page>
            <GithubCorner
              href='https://github.com/LauraAubin/Reactoid'
              bannerColor={PURPLE}
              octoColor='#F4F6F8' // (sky, light)
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
