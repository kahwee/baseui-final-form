// @flow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {adaptToFormControl} from '../adapters';
import {render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

describe('form-control/adapters', () => {
  it('should pass sanity test', () => {
    const CAPTION_TEXT = 'Caption here';
    const LABEL_TEXT = 'Label here';
    const {container, getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={() => {}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                caption={CAPTION_TEXT}
                label={LABEL_TEXT}
                help="Basic help"
                render={(props) => (
                  <div>
                    <FormControl {...adaptToFormControl(props)}>
                      <input name={props.input.name} />
                    </FormControl>
                  </div>
                )}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(getByText(CAPTION_TEXT)).toBeDefined();
    expect(getByText(LABEL_TEXT)).toBeDefined();
    const inputNode = container.querySelectorAll('input');
    expect(inputNode).toHaveLength(1);
  });
});
