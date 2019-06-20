// @noflow
import * as React from 'react';
import {render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';
import HelpIcon from '../help-icon';

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
