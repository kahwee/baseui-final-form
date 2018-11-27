// @flow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import CreatableSelect from 'react-select/lib/Creatable';
import ReactSelect from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';
import {Field, Form} from 'react-final-form';
import {cleanup, fireEvent, render} from 'react-testing-library';

const TEST_CLASSNAME = 'react-select-test-for-jest';

describe('react-select', () => {
  const defaultProps = {
    name: 'fruit',
    label: 'My favorite fruit',
    options,
    component: ReactSelect,
  };

  afterEach(cleanup);

  describe('single select', () => {
    it('should pass sanity checks', () => {
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form onSubmit={() => {}} initialValues={{fruit: 'pineapple'}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  {...defaultProps}
                  inputProps={{className: `${TEST_CLASSNAME}-1`}}
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      expect(container.querySelector(`.${TEST_CLASSNAME}-1`)).toBeDefined();
      expect(getByText('Pineapple')).toBeDefined();
    });

    it('should update value on click', () => {
      const mockSubmit = jest.fn();
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit} initialValues={{fruit: 'pineapple'}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  {...defaultProps}
                  inputProps={{
                    className: `${TEST_CLASSNAME}-3`,
                    menuIsOpen: true,
                  }}
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const optionWatermelon = getByText('Watermelon');
      expect(getByText('Pineapple')).toBeDefined();
      fireEvent.click(optionWatermelon);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruit: 'watermelon'},
        expect.anything(),
        expect.any(Function)
      );
    });
  });

  describe('multiple select', () => {
    it('should pass sanity checks', () => {
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
                  isMulti
                  inputProps={{className: `${TEST_CLASSNAME}-2`}}
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      expect(container.querySelector(`${TEST_CLASSNAME}-2`)).toBeDefined();
      expect(getByText('Pineapple')).toBeDefined();
      expect(getByText('Apple')).toBeDefined();
    });

    it('should add values on click', () => {
      const mockSubmit = jest.fn();
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form
            onSubmit={mockSubmit}
            initialValues={{fruit: ['pineapple', 'apple']}}
          >
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  {...defaultProps}
                  RootSelect={CreatableSelect}
                  isMulti
                  inputProps={{
                    className: `${TEST_CLASSNAME}-3`,
                    menuIsOpen: true,
                  }}
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const optionWatermelon = getByText('Watermelon');
      fireEvent.click(optionWatermelon);
      expect(getByText('Pineapple')).toBeDefined();
      expect(getByText('Apple')).toBeDefined();
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruit: expect.arrayContaining(['apple', 'watermelon', 'pineapple'])},
        expect.anything(),
        expect.any(Function)
      );
    });
  });
});
