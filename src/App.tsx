import * as React from "react";

import { AppProvider, Page } from "@shopify/polaris";

import Home from "./pages/Home";

class App extends React.Component {
  public render() {
    return (
      <AppProvider>
        <Page title="">
          <Home />
        </Page>
      </AppProvider>
    );
  }
}
export default App;
