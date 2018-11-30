// @noflow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import FormControlLabel from '../form-control-label';
import {render} from 'react-testing-library';

describe('help-icon', () => {
  it('should pass sanity test', () => {
    const {container} = render(
      <BaseuiProvider>
        <FormControlLabel help="Testing" />
      </BaseuiProvider>
    );
    const spanNode = container.querySelectorAll('span');
    expect(spanNode).toHaveLength(1);
  });
});
