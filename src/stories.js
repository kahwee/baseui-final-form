/* eslint-env node */
// @flow

import * as React from 'react';
import {Block} from 'baseui/block';
import Delete from 'baseui/icon/delete';
import {FieldArray} from 'react-final-form-arrays'; // This is for Field arrays
import Input from './input/index';
import Plus from 'baseui/icon/plus';
import RadioGroup from './radio-group/index';
import {action} from '@storybook/addon-actions';
import arrayMutators from 'final-form-arrays'; // This is for Field arrays
import {storiesOf} from '@storybook/react';
import {Button, SHAPE, SIZE} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from 'baseui/modal';

const Condition = ({when, is, children}) => (
  <Field name={when} subscription={{value: true}}>
    {({input: {value}}) => (value === is ? children : null)}
  </Field>
);

type ModalStateContainerProps = {
  isInitiallyOpen: boolean,
  children: ({open: Function, close: Function, isOpen: boolean}) => React.Node,
};
type ModalStateContainerState = {
  isOpen: boolean,
};

class ModalStateContainer extends React.Component<
  ModalStateContainerProps,
  ModalStateContainerState
> {
  static defaultProps = {
    isInitiallyOpen: false,
  };
  state = {
    isOpen: this.props.isInitiallyOpen,
  };
  toggle = (open = !this.state.isOpen) => {
    this.setState({
      isOpen: Boolean(open),
    });
  };
  open = () => {
    this.toggle(true);
  };
  close = () => {
    this.toggle(false);
  };
  render() {
    return this.props.children({
      toggle: this.toggle,
      open: this.open,
      close: this.close,
      setState: this.setState.bind(this),
      ...this.state,
    });
  }
}

storiesOf('Playground', module)
  .add('Basic', () => (
    // Target: City and Zipcode options (radio group)
    // Input: CityName
    // Input: ZipCode
    <Form
      initialValues={{target: 'city'}}
      onSubmit={action('submit')}
      subscription={{submitting: true, pristine: true}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Block
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gridGap="scale300"
          >
            <Block position="relative">
              <Field
                name="firstName"
                label="First name"
                component={Input}
                help="Your given name"
              />
            </Block>
            <Block position="relative">
              <Field
                name="lastName"
                label="Last name"
                component={Input}
                help="Your family name"
              />
            </Block>
          </Block>
          <Field
            name="target"
            component={RadioGroup}
            caption="Pick a target"
            label="Target"
            help="Choose between a city and a zip code"
            options={[
              {label: 'City', value: 'city'},
              {label: 'Zip Code', value: 'zipCode'},
            ]}
          />
          <Condition when="target" is="zipCode">
            <Field
              name="zipCode"
              component={Input}
              caption="Enter your zip code"
              label="Zip code"
            />
          </Condition>
          <Condition when="target" is="city">
            <Field
              name="city"
              component={Input}
              caption="Enter your city"
              label="City"
            />
          </Condition>
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Modal', () => (
    <ModalStateContainer>
      {({open, close, isOpen}) => (
        <React.Fragment>
          <Button onClick={open} className="open-modal-button">
            Open Modal
          </Button>
          <Modal onClose={close} isOpen={isOpen}>
            <Form
              initialValues={{target: 'city'}}
              onSubmit={values => {
                action('submit')(values);
                close();
              }}
              subscription={{submitting: true, pristine: true}}
              render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit}>
                  <ModalHeader>Hello world</ModalHeader>
                  <ModalBody>
                    <Block
                      display="grid"
                      gridTemplateColumns="1fr 1fr"
                      gridGap="scale300"
                    >
                      <Block position="relative">
                        <Field
                          name="firstName"
                          label="First name"
                          component={Input}
                          help="Your given name"
                        />
                      </Block>
                      <Block position="relative">
                        <Field
                          name="lastName"
                          label="Last name"
                          component={Input}
                          help="Your family name"
                        />
                      </Block>
                    </Block>
                    <Field
                      name="target"
                      component={RadioGroup}
                      caption="Pick a target"
                      label="Target"
                      help="Choose between a city and a zip code"
                      options={[
                        {label: 'City', value: 'city'},
                        {label: 'Zip Code', value: 'zipCode'},
                      ]}
                    />
                    <Condition when="target" is="zipCode">
                      <Field
                        name="zipCode"
                        component={Input}
                        caption="Enter your zip code"
                        label="Zip code"
                      />
                    </Condition>
                    <Condition when="target" is="city">
                      <Field
                        name="city"
                        component={Input}
                        caption="Enter your city"
                        label="City"
                      />
                    </Condition>
                  </ModalBody>
                  <ModalFooter>
                    <ModalButton type="button" kind="minimal" onClick={close}>
                      Cancel
                    </ModalButton>
                    <ModalButton type="submit" disabled={pristine || invalid}>
                      Ok
                    </ModalButton>
                  </ModalFooter>
                </form>
              )}
            />
          </Modal>
        </React.Fragment>
      )}
    </ModalStateContainer>
  ))
  .add('Field arrays', () => {
    return (
      <Form
        onSubmit={action('submit')}
        mutators={{
          ...arrayMutators,
        }}
        subscription={{submitting: true, pristine: true}}
        render={props => {
          const {handleSubmit, pristine, invalid, form} = props;
          return (
            <form onSubmit={handleSubmit}>
              <FieldArray name="customers">
                {({fields}) => (
                  <div>
                    {fields.map((name, index) => (
                      <div key={name}>
                        <Block
                          key={name}
                          display="grid"
                          gridTemplateColumns="1fr 1fr fit-content(36px)"
                          alignItems="end"
                          gridGap="scale300"
                        >
                          <Block>
                            <Field
                              name={`${name}.firstName`}
                              label="First name"
                              component={Input}
                              help="Your given name"
                            />
                          </Block>
                          <Block>
                            <Field
                              name={`${name}.lastName`}
                              label="Last name"
                              component={Input}
                              help="Your family name"
                            />
                          </Block>
                          <Block>
                            <Button
                              shape={SHAPE.square}
                              type="button"
                              size={SIZE.compact}
                              onClick={() => fields.remove(index)}
                            >
                              <Delete size={16} />
                            </Button>
                          </Block>
                        </Block>
                      </div>
                    ))}

                    <Button
                      startEnhancer={() => <Plus size={16} />}
                      type="button"
                      size={SIZE.compact}
                      onClick={() => fields.push({firstName: '', lastName: ''})}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Button type="submit" disabled={pristine || invalid}>
                Submit
              </Button>
            </form>
          );
        }}
      />
    );
  });
