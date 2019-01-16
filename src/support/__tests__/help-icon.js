// @noflow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import HelpIcon from '../help-icon';
import {render} from 'react-testing-library';

describe('help-icon', () => {
  it('should pass sanity test', () => {
    const {container} = render(
      <BaseuiProvider>
        <HelpIcon />
      </BaseuiProvider>
    );
    const svgNode = container.querySelectorAll('svg');
    expect(svgNode).toHaveLength(1);
  });
});
