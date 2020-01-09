// @flow
import * as React from 'react';
import {Select as BaseuiSelect} from 'baseui/select/index';
import {Field, Form, FormSpy} from 'react-final-form';
import {adaptToMultiSelect, adaptToSingleSelect} from '../adapters';
import {cleanup, fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('select/adapters', () => {
  const defaultProps = {
    name: 'fruit',
    label: 'My favorite fruit',
    options,
  };

  afterEach(cleanup);

  it('should fail on missing options in single select', () => {
    /* eslint-disable no-console */
    // $FlowFixMe
    console.error = jest.fn();
    const t = () => {
      render(
        <BaseuiProvider>
          <Form onSubmit={() => {}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="hello"
                  render={props => (
                    <BaseuiSelect {...adaptToSingleSelect(props)} />
                  )}
                />
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

  it('should fail on missing options in multi select', () => {
    /* eslint-disable no-console */
    // $FlowFixMe
    console.error = jest.fn();
    const t = () => {
      render(
        <BaseuiProvider>
          <Form onSubmit={() => {}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="hello"
                  render={props => (
                    <BaseuiSelect {...adaptToMultiSelect(props)} />
                  )}
                />
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

  it('should pass props such as placeholder to BaseWeb (single)', () => {
    const placeholder = 'My placeholder';
    const {getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="hello"
                options={[]}
                placeholder={placeholder}
                render={props => (
                  <BaseuiSelect {...adaptToSingleSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(getByText(placeholder).textContent).toBe(placeholder);
  });

  it('should pass props such as placeholder to BaseWeb (multi)', () => {
    const placeholder = 'My placeholder';
    const {getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="hello"
                multi={true}
                options={[]}
                placeholder={placeholder}
                render={props => (
                  <BaseuiSelect {...adaptToSingleSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(getByText(placeholder).textContent).toBe(placeholder);
  });

  it('should initialize fine if initialValues is undefined', async () => {
    const onChange = jest.fn();
    render(
      <BaseuiProvider>
        <Form onSubmit={() => {}} initialValues={{fruit: undefined}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <FormSpy onChange={onChange} subscription={{values: true}} />
              <Field
                options={[]}
                name="fruit"
                multi
                render={props => (
                  <BaseuiSelect creatable {...adaptToMultiSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(onChange).toHaveBeenLastCalledWith({
      values: {fruit: undefined},
    });
  });

  it('should pass trigger blur, focus and change for single select', () => {
    const onChange = jest.fn();
    const {container, getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}} initialValues={{fruit: 'pineapple'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <FormSpy onChange={onChange} subscription={{values: true}} />
              <Field
                {...defaultProps}
                render={props => (
                  <BaseuiSelect {...adaptToSingleSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const baseuiSelect = container.querySelector('[data-baseweb=select]');
    const input = baseuiSelect.querySelector('input');
    fireEvent.blur(input);
    fireEvent.focus(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(baseuiSelect).toBeDefined();
    expect(getByText('Pineapple')).toBeDefined();
  });

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
              <Field
                {...defaultProps}
                multi
                render={props => (
                  <BaseuiSelect {...adaptToMultiSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const baseuiSelect = container.querySelector('[data-baseweb=select]');
    const input = baseuiSelect.querySelector('input');
    fireEvent.blur(input);
    fireEvent.focus(input);
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

  it('Default option should be selected when no initial value is provided', () => {
    const {getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="fruit"
                options={[
                  {id: 'pineapple', label: 'Pineapple'},
                  {id: 'watermelon', label: 'Watermelon'},
                  {id: 'defaultOption', label: 'Default Option'},
                ]}
                softDefaultValue="defaultOption"
                render={props => (
                  <BaseuiSelect {...adaptToSingleSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(getByText('Default Option').textContent).toBe('Default Option');
  });

  it('Default option should not be selected when an initial value is provided', () => {
    const {getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}} initialValues={{fruit: 'pineapple'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="fruit"
                options={[
                  {id: 'pineapple', label: 'Pineapple'},
                  {id: 'watermelon', label: 'Watermelon'},
                  {id: 'defaultOption', label: 'Default Option'},
                ]}
                softDefaultValue="defaultOption"
                render={props => (
                  <BaseuiSelect {...adaptToSingleSelect(props)} />
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(getByText('Pineapple').textContent).toBe('Pineapple');
  });
});
