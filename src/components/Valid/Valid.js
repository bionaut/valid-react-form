import React, { Component, PropTypes, cloneElement } from 'react';
import classes from '../../utils/classes';
import resolveError from '../../utils/resolveError';
import validate from '../../utils/validate';
import Error from '../Error/Error';

export default class Valid extends Component {
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
    const { name, friendlyName, errorMessages }  = this.props;

    if (register) {
      register(name, friendlyName, errorMessages);
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
    const { name, required, validator } = this.props;
    const failedValidator = validate(required, validator, value);
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

    if (value === '' && init) {
      return;
    }

    if (onChange) {
      onChange(value, valid);
    }
  }

  handleChange(ev) {
    const value = ev.target.value;
    this.update(value);
  }

  render() {

    const {
      submitted,
      errors,
      errorPanel,
      styles,
      readOnly
    } = this.context;

    const {
      name = 'untitled',
      changeCallback = 'onChange',
      required,
      validator,
      standalone,
      errorMessages,
      className,
      disabled,
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

    const errorProps = {
      message: !errorPanel &&
      (submitted || standalone) &&
      !disabled &&
      ((errors && errors[name]) ||
      resolveError(errorMessages, failedValidator))
    };

    const wrapperClasses = classes(
      'valid-component',
      className,
      required && 'required',
      valid && 'valid'
    );

    const modifiedChildren = cloneElement(children, {
      [changeCallback]: this.handleChange.bind(this),
      style: (styles && (valid ? {} : submitted && !valid && styles.invalid)) || {}
    });

    return (
      <div className={wrapperClasses}>
        {modifiedChildren}
        <Error {...errorProps} />
      </div>
    );
  }
}

Valid.propTypes = {
  name: PropTypes.string.isRequired
};

Valid.contextTypes = {
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