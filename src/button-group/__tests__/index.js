// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {cleanup, fireEvent, render} from 'react-testing-library';
import BaseuiProvider from '../../with-baseui';
import ButtonGroup from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('ButtonGroup', () => {
  describe('mode=checkbox', () => {
    const defaultProps = {
      name: 'fruits',
      label: 'My favorite fruits',
      mode: 'checkbox',
      options,
      component: ButtonGroup,
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
                  <Field name="hello" component={ButtonGroup} />
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

    it('should be initialized as {}, then do sanity click arounds', () => {
      const mockSubmit = jest.fn();
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} $size="compact" />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const cboxPeach = getByText('Peach');
      const cboxApple = getByText('Apple');
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {},
        expect.anything(),
        expect.any(Function)
      );
      fireEvent.click(cboxPeach);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruits: ['peach']},
        expect.anything(),
        expect.any(Function)
      );
      fireEvent.click(cboxApple);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruits: ['peach', 'apple']},
        expect.anything(),
        expect.any(Function)
      );
      fireEvent.click(cboxPeach);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruits: ['apple']},
        expect.anything(),
        expect.any(Function)
      );
    });

    it('should be initialized as peach then include apple', () => {
      const mockSubmit = jest.fn();
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit} initialValues={{fruits: ['peach']}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const cboxApple = getByText('Apple');
      fireEvent.click(cboxApple);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruits: ['peach', 'apple']},
        expect.anything(),
        expect.any(Function)
      );
    });

    it('should be initialized as disabled kiwi and still be submitted with disabled value', () => {
      const mockSubmit = jest.fn();
      const {container} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit} initialValues={{fruits: ['kiwi']}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      // This is to check it is not supposed to select the first value or something
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruits: ['kiwi']},
        expect.anything(),
        expect.any(Function)
      );
    });
  });

  describe('radio', () => {
    const defaultProps = {
      name: 'fruit',
      label: 'My favorite fruit',
      options,
      mode: 'radio',
      component: ButtonGroup,
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
                  <Field name="hello" component={ButtonGroup} />
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

    it('should be initialized as {}, then updated to peach, then be updated to apple', () => {
      const mockSubmit = jest.fn();
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const radioPeach = getByText('Peach');
      const radioApple = getByText('Apple');
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {},
        expect.anything(),
        expect.any(Function)
      );
      fireEvent.click(radioPeach);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruit: 'peach'},
        expect.anything(),
        expect.any(Function)
      );
      fireEvent.click(radioApple);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruit: 'apple'},
        expect.anything(),
        expect.any(Function)
      );
    });

    it('should be initialized as peach then be updated to apple', () => {
      const mockSubmit = jest.fn();
      const {container, getByText} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit} initialValues={{fruit: 'peach'}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      const radioApple = getByText('Apple');
      fireEvent.click(radioApple);
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruit: 'apple'},
        expect.anything(),
        expect.any(Function)
      );
    });

    it('should be initialized as disabled kiwi and still be submitted with disabled value', () => {
      const mockSubmit = jest.fn();
      const {container} = render(
        <BaseuiProvider>
          <Form onSubmit={mockSubmit} initialValues={{fruit: 'kiwi'}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const formNode = container.querySelector('form');
      // This is to check it is not supposed to select the first value or something
      fireEvent.submit(formNode);
      expect(mockSubmit).toHaveBeenLastCalledWith(
        {fruit: 'kiwi'},
        expect.anything(),
        expect.any(Function)
      );
    });
  });
});
