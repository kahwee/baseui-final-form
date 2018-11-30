// @noflow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import HelpIcon from '../help-icon';
import {render} from 'react-testing-library';

describe('help-icon', () => {
  it('should pass sanity test', () => {
    const {container} = render(
      <BaseuiProvider>
        <HelpIcon $position="left" />
        <HelpIcon $position="right" $isFocused={true} />
        <HelpIcon />
      </BaseuiProvider>
    );
    const spanNode = container.querySelectorAll('span');
    expect(spanNode).toHaveLength(3);
  });
});
