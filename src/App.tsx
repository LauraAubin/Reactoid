import * as React from "react";
import "./App.scss";

import { Card, Page, AppProvider } from "@shopify/polaris";

interface State {
  color: string;
}

class App extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { color: "Teal" };
  }

  public render() {
    const {color} = this.state;

    return (
      <AppProvider>
        <Page title="This is made using Create React App">
          <Card title="This is a card thanks to Polaris ⭐️">
            <Card.Section>
              <div className={color}>This text is {color.toLowerCase()} thanks to Sass 💅and Typescript 😄</div>
            </Card.Section>
          </Card>
        </Page>
      </AppProvider>
    );
  }
}
export default App;
