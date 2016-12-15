import React, { Component, PropTypes, cloneElement } from 'react';
import classes from '../../utils/classes';
import resolveError from '../../utils/resolveError';
import Errors from '../Errors/Errors';
import Debug from '../Debug/Debug';

export default class ValidForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      submitted: false,
      payload: {},
      externalErrors: {},
      components: {}
    }
  }

  getChildContext() {
    return {
      submitted: this.state.submitted,
      errorPanel: this.props.errorPanel,
      errors: this.props.errors,
      readOnly: this.props.readOnly,
      updatePayload: this.updatePayload.bind(this),
      register: this.register.bind(this),
      unregister: this.unregister.bind(this)
    }
  };

  updatePayload(name, value, failedValidator) {
    this.setState(({ payload }) => {
      payload[name] = failedValidator ? null : value;
      const valid = this.validateForm(payload);
      return {
        payload,
        valid
      };
    });
    this.updateComponent(name, failedValidator);
  }

  register(name, friendlyName, errorMessages) {
    this.setState(({ components }) => {
      components[name] = {
        friendlyName,
        errorMessages
      };
      return {
        components
      };
    })

  }

  updateComponent(name, failedValidator) {
    this.setState(({ components }) => {
      components[name].failedValidator = failedValidator;
      return {
        components
      };
    });

  }

  validateForm(payload) {
    let valid = true;

    for (let val in payload) {
      if (payload[val] === null) valid = false;
    }

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { valid, payload } = this.state;

    this.setState(() => ({
      submitted: true
    }));

    if (valid) {
      const extended_payload = Object.assign({}, payload, this.props.extended);
      onSubmit(extended_payload);
    }
  }

  unregister() {
    // todo
  }

  getErrors() {
    const { components } = this.state;
    const { errors } = this.props;

    const getLocalErrorMessage = (name) => {
      const { failedValidator, errorMessages, friendlyName } = components[name];
      const errorMessage = resolveError(errorMessages, failedValidator);
      return errorMessage ? `${friendlyName}: ${errorMessage}` : null;
    };

    const getExternalErrorMessage = (name) => {
      const { friendlyName } = components[name];
      return `${friendlyName}: ${errors[name]}`;
    };

    const localErrors = Object.keys(components)
      .map((name) => getLocalErrorMessage(name))
      .filter((i) => i !== null);

    const externalErrors = !!errors ? Object.keys(errors)
      .map((name) => getExternalErrorMessage(name)) : [];

    return [...localErrors, ...externalErrors];

  }

  render() {

    const {
      external,
      externalErrors,
      readOnly,
      debug,
      children,
      className,
      extended,
      errorPanel,
      errors,
      ...other
    } = this.props;

    const {
      payload,
      valid,
      submitted
    } = this.state;

    const debugProps = { debug, payload, valid, submitted };
    const errorMessages = !!errorPanel && !readOnly && submitted && this.getErrors();

    return (
      <div className={classes('valid-form', className)}>
        <Errors messages={errorMessages}/>
        <form {...other} onSubmit={this.handleSubmit.bind(this)}>
          {children}
        </form>
        <Debug {...debugProps}/>
      </div>
    );
  }
}

ValidForm.childContextTypes = {
  submitted: PropTypes.bool,
  readOnly: PropTypes.bool,
  errorPanel: PropTypes.bool,
  errors: PropTypes.object,
  payload: PropTypes.object,
  updatePayload: PropTypes.func,
  register: PropTypes.func,
  unregister: PropTypes.func
};