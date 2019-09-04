// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {adaptToSlider} from '../adapters';
import {fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

// Test skipped due to compatibility issues
describe('slider/adaptToSlider', () => {
  it('should be submitted with default values of 1 when initialized', () => {
    const mockSubmit = jest.fn();
    const Slider = require('baseui/slider').Slider;
    jest.mock('baseui/slider', () => {
      return {
        Slider: () => null,
      };
    });

    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{age: [19]}}>
          {({handleSubmit}) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  name="age"
                  render={props => {
                    return <Slider {...adaptToSlider(props)} />;
                  }}
                />
              </form>
            );
          }}
        </Form>
      </BaseuiProvider>
    );
    const formNode = container.querySelector('form');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {age: [19]},
      expect.anything(),
      expect.anything()
    );
  });

  it('should be submitted with default values of 2 when initialized', () => {
    const mockSubmit = jest.fn();
    const Slider = require('baseui/slider').Slider;
    jest.mock('baseui/slider', () => {
      return {
        Slider: () => null,
      };
    });
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{age: [19, 40]}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="age"
                min={18}
                max={120}
                render={props => {
                  return <Slider {...adaptToSlider(props)} />;
                }}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const formNode = container.querySelector('form');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {age: [19, 40]},
      expect.anything(),
      expect.anything()
    );
  });
});
