/* eslint-env node */
// @flow

import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import Input from './input/index';
import RadioGroup from './radio-group/index';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
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
  ));
