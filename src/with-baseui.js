// @flow
import * as React from 'react';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {LightTheme, ThemeProvider} from 'baseui';

const engine = new Styletron();

export default function withBaseui(story: Function) {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
}
