// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {Input} from 'baseui/input';
import {adaptToInput} from '../adapters';
import {fireEvent, render} from '@testing-library/react';
import {minLength} from '../../validate';
import BaseuiProvider from '../../with-baseui';

const minLength3 = minLength(3);

describe('input/adapters', () => {
  it('should register initialValues and subsequent changes', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{firstName: 'unchanged'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                render={props => <Input {...adaptToInput(props)} />}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    expect(inputNode.value).toBe('unchanged');
    const formNode = container.querySelector('form');
    const event1 = {target: {name: 'firstName', value: 'changed1'}};
    const event2 = {target: {name: 'firstName', value: 'changed2'}};
    fireEvent.change(inputNode, event1);
    expect(inputNode.value).toBe('changed1');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {firstName: 'changed1'},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.change(inputNode, event2);
    expect(inputNode.value).toBe('changed2');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {firstName: 'changed2'},
      expect.anything(),
      expect.any(Function)
    );
  });

  it('should validate on blur', async () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form
          onSubmit={mockSubmit}
          initialValues={{firstName: 'unchanged'}}
          validateOnBlur
        >
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                render={props => <Input {...adaptToInput(props)} />}
                validate={minLength3}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    expect(inputNode.value).toBe('unchanged');
    const event1 = {target: {name: 'firstName', value: 'x'}};
    const event2 = {target: {name: 'firstName', value: 'xxx'}};
    fireEvent.change(inputNode, event1);
    expect(inputNode.getAttribute('aria-invalid')).toBe('false');
    fireEvent.blur(inputNode);
    expect(inputNode.getAttribute('aria-invalid')).toBe('true');
    expect(inputNode.value).toBe('x');
    fireEvent.change(inputNode, event2);
    expect(inputNode.getAttribute('aria-invalid')).toBe('true');
    expect(inputNode.value).toBe('xxx');
    fireEvent.blur(inputNode);
    expect(inputNode.getAttribute('aria-invalid')).toBe('false');
  });
});
