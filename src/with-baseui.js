// @flow
import * as React from 'react';
import {BaseProvider, createTheme, lightThemePrimitives} from 'baseui';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';

export const primaryFontFamily =
  'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';
export const secondaryFontFamily =
  'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';
export const monoFontFamily =
  'UberMoveMono, "Lucida Console", Monaco, monospace';

const engine = new Styletron();
export const dataTheme = createTheme(
  {...lightThemePrimitives, primaryFontFamily},
  {
    name: 'data-light-theme-with-move',
    typography: {
      font1450: {
        fontFamily: secondaryFontFamily,
      },
    },
  }
);

export default function withBaseui(story: any) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={dataTheme}>
        {typeof story === 'function' ? story() : story.children}
      </BaseProvider>
    </StyletronProvider>
  );
}
