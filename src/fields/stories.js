import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
const engine = new Styletron();
import {LightTheme, ThemeProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';

storiesOf('Badge', module)
  .addDecorator(withInfo)
  .addDecorator(story => (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
    </StyletronProvider>
  ))
  .add('Basic', () => <StatefulInput />, {
    info: `
      description or documentation about my component, supports markdown
    
    
    `,
  })
  .add('Colorful', () => (
    <div $p={4} key="badge-colorful">
      hello
    </div>
  ));
