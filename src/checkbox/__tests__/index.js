// @flow
import * as React from 'react';
import {render, fireEvent} from 'react-testing-library';
import {Form, Field} from 'react-final-form';
import Checkbox from '../index';
import BaseuiProvider from '../../with-baseui';

describe('checkbox', () => {
  it('should record a submission in final-form checkbox is toggled without initialValues', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="yesIcan"
                component={Checkbox}
                caption="Yes, I can"
                label="I can"
                type="checkbox"
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    const labelNode = inputNode.parentNode;
    const formNode = container.querySelector('form');
    fireEvent.click(labelNode);
    expect(inputNode.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({yesIcan: true}, expect.anything());
    fireEvent.click(labelNode);
    expect(inputNode.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({yesIcan: false}, expect.anything());
  });

  it('should record a submission in final-form checkbox is toggled with initialValues', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{yesIcan: true}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="yesIcan"
                component={Checkbox}
                caption="Yes, I can"
                label="I can"
                type="checkbox"
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    const labelNode = inputNode.parentNode;
    const formNode = container.querySelector('form');
    expect(inputNode.checked).toBe(true);
    fireEvent.click(labelNode);
    expect(inputNode.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({yesIcan: false}, expect.anything());
  });

  it('should record a submission in final-form checkbox is toggled with incorrect initialValues', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{yesIcan: 'blahblah'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="yesIcan"
                component={Checkbox}
                caption="Yes, I can"
                label="I can"
                type="checkbox"
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    const labelNode = inputNode.parentNode;
    const formNode = container.querySelector('form');
    expect(inputNode.checked).toBe(true);
    fireEvent.click(labelNode);
    expect(inputNode.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({yesIcan: false}, expect.anything());
  });
});
