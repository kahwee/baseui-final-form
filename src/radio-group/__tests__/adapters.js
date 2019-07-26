// @noflow
import * as React from 'react';
import {
  Radio as BaseuiRadio,
  RadioGroup as BaseuiRadioGroup,
} from 'baseui/radio';
import {Field, Form} from 'react-final-form';
import {adaptToRadioGroup} from '../adapters';
import {cleanup, fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('radiogroup', () => {
  afterEach(cleanup);

  it('should be initialized as {}, then updated to peach, then be updated to apple', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="fruit"
                render={props => (
                  <BaseuiRadioGroup {...adaptToRadioGroup(props)}>
                    {options.map(option => (
                      <BaseuiRadio value={option.id} key={option.id}>
                        {option.label}
                      </BaseuiRadio>
                    ))}
                  </BaseuiRadioGroup>
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const formNode = container.querySelector('form');
    const radioPeach = getByLabelText('Peach');
    const radioApple = getByLabelText('Apple');
    expect(radioPeach.checked).toBe(false);
    expect(radioApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(radioPeach);
    expect(radioPeach.checked).toBe(true);
    expect(radioApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruit: 'peach'},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(radioApple);
    expect(radioPeach.checked).toBe(false);
    expect(radioApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruit: 'apple'},
      expect.anything(),
      expect.any(Function)
    );
  });
});
