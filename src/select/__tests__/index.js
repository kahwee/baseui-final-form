// @flow
import * as React from 'react';
import {Field, Form, FormSpy} from 'react-final-form';
import {cleanup, fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';
import Select from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('select', () => {
  const defaultProps = {
    name: 'fruit',
    label: 'My favorite fruit',
    options,
    component: Select,
  };

  afterEach(cleanup);

  it('should pass sanity checks for multiple select', () => {
    const onChange = jest.fn();
    const {container, getByText} = render(
      <BaseuiProvider>
        <Form
          onSubmit={() => {}}
          initialValues={{fruit: ['pineapple', 'apple']}}
        >
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <FormSpy onChange={onChange} subscription={{values: true}} />
              <Field {...defaultProps} multi />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const baseuiSelect = container.querySelector('[data-baseweb=select]');
    expect(baseuiSelect).toBeDefined();
    const [tagApple, tagPineapple] = container.querySelectorAll(
      '[data-baseweb=tag]'
    );
    expect(getByText('Pineapple')).toBeDefined();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, {
      values: {fruit: expect.arrayContaining(['pineapple', 'apple'])},
    });
    expect(tagPineapple).toBeDefined();
    expect(getByText('Apple')).toBeDefined();
    fireEvent.click(tagApple.querySelector('svg'));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(2, {
      // should not contain apple any more since removal
      values: {fruit: expect.not.arrayContaining(['apple'])},
    });
    expect(getByText('Pineapple')).toBeDefined();
    expect(() => {
      getByText('Apple');
    }).toThrow();
  });
});
