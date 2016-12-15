import React, { Component, PropTypes, cloneElement } from 'react';
import Radium from 'radium';
import classes from '../../utils/classes';
import resolveError from '../../utils/resolveError';
import validate from '../../utils/validate';
import Error from '../Error/Error';

@Radium
export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || false,
      failedValidator: null
    };
  }

  componentDidMount() {
    const { register } = this.context;
    const { value }  = this.state;
    const { name, friendlyName, label, errorMessages }  = this.props;

    if (register) {
      register(name, friendlyName || label, errorMessages);
    }

    this.update(value, true);
  }

  componentDidUpdate(prevProps) {
    const prevValue = prevProps.value;
    const { value } = this.props;
    if (prevValue !== value) {
      this.update(value);
    }
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { unregister } = this.context;
    if (unregister) {
      unregister(name);
    }
  }

  update(value, init) {
    const { updatePayload } = this.context;
    const { name, required, validator, disabled } = this.props;
    const failedValidator = validate(required, validator, value, disabled);
    const valid = !failedValidator;

    this.setState(() => {
      return {
        value,
        valid,
        failedValidator
      }
    });

    if (updatePayload) {
      updatePayload(name, value, failedValidator);
    }

    this.onChangeCallback(value, valid, init);

  }

  onChangeCallback(value, valid, init) {
    const { onChange } = this.props;

    if (value === '' || !value && init) {
      return;
    }

    if (onChange) {
      onChange(value, valid);
    }
  }

  handleChange() {
    const { disabled } = this.props;
    const isReadOnly = this.context.readOnly || this.props.readOnly;
    if (disabled || isReadOnly){
      return;
    }
    const { value } = this.state;
    this.update(!value);
  }

  render() {

    const {
      submitted,
      errors,
      errorPanel,
      styles
    } = this.context;

    const {
      required,
      validator,
      standalone,
      name = 'untitled',
      errorMessages,
      className,
      disabled,
      label,
      children,
      style,
      friendlyName,
      ...other
    } = this.props;

    const {
      failedValidator,
      valid,
      value,
    } = this.state;

    const isReadOnly = this.context.readOnly || this.props.readOnly;
    const errorProps = { message: !errorPanel && !isReadOnly && (submitted || standalone) && !disabled && ((errors && errors[name]) || resolveError(errorMessages, failedValidator)) };

    const wrapperClasses = classes(
      'valid-toggle',
      className,
      required && 'required',
      isReadOnly && 'read-only',
      disabled && !isReadOnly && 'disabled',
      valid && 'valid'
    );

    const wrapperStyles = styles && [
        styles.toggle.wrapper,
        styles.clearfix
      ];

    const headStyles = styles && [
        styles.toggle.head.normal,
        value && styles.toggle.head.active,
        disabled && styles.toggle.head.disabled,
        submitted && !valid && !disabled && !isReadOnly && styles.toggle.head.error
      ];

    const bodyStyles = styles && [
        styles.toggle.body,
        submitted && !valid && !disabled && !isReadOnly && styles.toggle.body.error
      ];

    const tab = (disabled || isReadOnly) ? '' : '0';

    return (
      <div {...other} key='0' style={wrapperStyles} className={wrapperClasses}>
        <div tabIndex={tab}
             key='1'
             style={bodyStyles}
             onKeyPress={this.handleChange.bind(this)}
             onClick={this.handleChange.bind(this)}
             className='valid-toggle-body'>
          <div key='2' style={headStyles} className='valid-toggle-head'></div>
        </div>
        { !!(label || children) &&
        <div key='3' style={styles && styles.toggle.label} className='valid-toggle-label'>{label || children}</div>}
        <Error {...errorProps} />
      </div>
    );
  }
}

Toggle.contextTypes = {
  styles: PropTypes.object,
  readOnly: PropTypes.bool,
  errorPanel: PropTypes.bool,
  submitted: PropTypes.bool,
  updatePayload: PropTypes.func,
  register: PropTypes.func,
  unregister: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object
};