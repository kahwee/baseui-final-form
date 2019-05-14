// @flow
import * as React from 'react';
import {LightTheme, ThemeProvider} from 'baseui';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';

const engine = new Styletron();

export default function withBaseui(story: any) {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>
        {typeof story === 'function' ? story() : story.children}
      </ThemeProvider>
    </StyletronProvider>
  );
}
