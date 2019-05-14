// @flow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {cleanup, render} from 'react-testing-library';
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

  it('should fail on missing options', () => {
    /* eslint-disable no-console */
    // $FlowFixMe
    console.error = jest.fn();
    const t = () => {
      render(
        <BaseuiProvider>
          <Form onSubmit={() => {}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field name="hello" component={Select} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
    };
    expect(t).toThrow(Error);
    expect(console.error).toHaveBeenCalled();
    /* eslint-enable no-console */
  });

  it('should pass sanity checks for single select', () => {
    const {container, getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}} initialValues={{fruit: 'pineapple'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field {...defaultProps} className="select-test-for-jest-1" />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(container.querySelector('.select-test-for-jest-1')).toBeDefined();
    expect(getByText('Pineapple')).toBeDefined();
  });

  it('should pass sanity checks for multiple select', () => {
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
                multi
                className="select-test-for-jest-2"
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
