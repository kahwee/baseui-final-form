// @flow
import * as React from 'react';
import {BaseProvider, LightTheme} from 'baseui';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';

const engine = new Styletron();

export default function withBaseui(story: any) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {typeof story === 'function' ? story() : story.children}
      </BaseProvider>
    </StyletronProvider>
  );
}
