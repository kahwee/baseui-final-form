// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {cleanup, fireEvent, render} from 'react-testing-library';
import BaseuiProvider from '../../with-baseui';
import CreatableSelect from 'react-select/lib/Creatable';
import ReactSelect from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

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
                  <Field name="hello" component={ReactSelect} />
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

    it('should pass sanity checks', () => {
      const {container, getAllByText} = render(
        <BaseuiProvider>
          <Form onSubmit={() => {}} initialValues={{fruit: 'pineapple'}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} className={`${TEST_CLASSNAME}-1`} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      expect(container.querySelector(`.${TEST_CLASSNAME}-1`)).toBeDefined();
      expect(getAllByText('Pineapple')).toBeDefined();
    });

    it('should update value on click', () => {
      const mockSubmit = jest.fn();
      const {container, getByText, getAllByText} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit} initialValues={{fruit: 'pineapple'}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  {...defaultProps}
                  className={`${TEST_CLASSNAME}-3`}
                  menuIsOpen
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const optionWatermelon = getByText('Watermelon');
      expect(getAllByText('Pineapple')).toBeDefined();
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
                  className={`${TEST_CLASSNAME}-2`}
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
                  className={`${TEST_CLASSNAME}-3`}
                  menuIsOpen
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
