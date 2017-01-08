import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import classes from '../../utils/classes';
import resolveError from '../../utils/resolveError';
import validate from '../../utils/validate';
import Icons from '../Icons/Icons';
import Error from '../Error/Error';

@Radium
export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
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
    const prevDisabled = prevProps.disabled;
    const { value, disabled } = this.props;

    if (prevValue !== value) {
      this.update(value);
    }

    if (prevDisabled !== disabled){
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
    const { onChange, debounce } = this.props;

    if (value === '' && init) {
      return;
    }

    if (onChange) {
      if (debounce) {

        const { timeout } = this.state;

        if (timeout) {
          clearTimeout(timeout);
        }

        const newTimeout = setTimeout(() => {
          onChange(value);
        }, debounce);

        this.setState({
          timeout: newTimeout
        });

      } else {
        onChange(value, valid);
      }
    }
  }

  handleChange(ev) {
    ev.persist();
    const value = ev.target.value;
    this.update(value);
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
      icons = false,
      placeholder,
      type = 'text',
      label,
      name = 'untitled',
      errorMessages,
      className,
      disabled,
      style,
      friendlyName,
      debounce,
      onChange,
      helper,
      ...other
    } = this.props;

    const {
      failedValidator,
      valid,
      value,
    } = this.state;

    const isReadOnly = this.context.readOnly || this.props.readOnly;
    const iconsProps = { readOnly: isReadOnly, label, icons, submitted, standalone, valid, required, validator, disabled, helper };
    const errorProps = { message: !errorPanel && (submitted || standalone) && !disabled && !isReadOnly && ((errors && errors[name]) || resolveError(errorMessages, failedValidator)) };

    const wrapperClasses = classes(
      'valid-field',
      className,
      required && 'required',
      isReadOnly && 'read-only',
      disabled && !isReadOnly && 'disabled',
      valid && 'valid'
    );

    const computedStyles = styles && [
        styles.base,
        styles.field,
        disabled && !isReadOnly && styles.field.disabled,
        isReadOnly && styles.field.readOnly,
        submitted && !valid && !disabled && !isReadOnly && styles.field.error
      ];

    return (
      <div style={styles && styles.base} className={wrapperClasses}>
        {label && <label style={styles && styles.label} htmlFor={name}>{label}</label>}
        <input
          {...other}
          style={computedStyles}
          name={name}
          disabled={disabled || isReadOnly}
          id={name}
          type={type}
          value={value}
          onChange={this.handleChange.bind(this)}
          placeholder={placeholder}
        />
        <Icons {...iconsProps} />
        <Error {...errorProps} />
      </div>
    );
  }
}

Field.propTypes = {
  required: PropTypes.bool,
  validator: PropTypes.string,
  standalone: PropTypes.bool,
  icons: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  errorMessages: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  friendlyName: PropTypes.string,
  debounce: PropTypes.number,
  helper: PropTypes.string,
};

Field.contextTypes = {
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