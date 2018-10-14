// @flow
import * as React from 'react';
import {render, cleanup} from 'react-testing-library';
import {Form, Field} from 'react-final-form';
import Select from '../index';
import BaseuiProvider from '../../with-baseui';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('select', () => {
  const defaultProps = {
    name: 'fruit',
    label: 'My favorite fruit',
    options,
    component: Select,
  };

  afterEach(cleanup);

  it('should pass sanity checks for single select', async () => {
    const {container, getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}} initialValues={{fruit: 'pineapple'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                {...defaultProps}
                inputProps={{className: 'select-test-for-jest-1'}}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(container.querySelector('.select-test-for-jest-1')).toBeDefined();
    expect(getByText('Pineapple')).toBeDefined();
  });

  it('should pass sanity checks for multiple select', async () => {
    const {container, getByText} = render(
      <BaseuiProvider>
        <Form
          onSubmit={() => {}}
          initialValues={{fruit: ['pineapple', 'apple']}}
        >
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                {...defaultProps}
                multiple
                inputProps={{className: 'select-test-for-jest-2'}}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(container.querySelector('.select-test-for-jest-2')).toBeDefined();
    expect(getByText('Pineapple')).toBeDefined();
    expect(getByText('Apple')).toBeDefined();
  });
});
