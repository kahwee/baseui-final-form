// @flow
import * as React from 'react';
import {FormControlLabel} from '../form-control-label';
import {render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

describe('help-icon', () => {
  it('should pass sanity test', () => {
    const {container} = render(
      <BaseuiProvider>
        <FormControlLabel help="Testing" />
      </BaseuiProvider>
    );
    const spanNode = container.querySelectorAll('span');
    expect(spanNode).toHaveLength(2);
  });
});
