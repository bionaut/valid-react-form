import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import classes from '../../utils/classes';
import resolveError from '../../utils/resolveError';
import validate from '../../utils/validate';
import Icons from '../Icons/Icons';
import Icon from '../Icon/Icon';
import Error from '../Error/Error';
import Options from './Options';
import keycode from 'keycode';

export const VIEW_AS = 'label';
export const RETURN_AS = 'value';
export const SCROLL_TRIGGER = 5;

@Radium
export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
      returnAs: this.props.returnAs || RETURN_AS,
      viewAs: this.props.viewAs || VIEW_AS,
      expanded: false,
      failedValidator: null,
      highlighted: 0
    };

  }

  componentDidMount() {
    const { register } = this.context;
    const { value }  = this.state;
    const { name, friendlyName, label, errorMessages }  = this.props;

    if (register) {
      register(name, friendlyName || label, errorMessages);
    }

    const displayValue = this.getDisplayValue(value);
    this.update(value, displayValue, true);

  }

  componentDidUpdate(prevProps) {
    const prevValue = prevProps.value;
    const prevDisabled = prevProps.disabled;
    const { value, disabled } = this.props;

    if (prevValue !== value) {
      this.update(value);
    }

    if (prevDisabled !== disabled) {
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

  getIndex(value) {
    const { data, returnAs = RETURN_AS } = this.props;
    const index = data.map(i => i[returnAs]).indexOf(value);
    return index > -1 ? index : 0;
  }

  getDisplayValue(value) {
    const { data } = this.props;
    const { returnAs, viewAs } = this.state;
    const target = data.find((item) => {
      return item[returnAs] === value;
    });
    return target && target[viewAs];
  }

  update(value, displayValue, init) {
    const { updatePayload } = this.context;
    const { name, required, validator, disabled } = this.props;
    const failedValidator = validate(required, validator, value, disabled);
    const valid = !failedValidator;

    this.setState(() => {
      return {
        value,
        valid,
        displayValue,
        failedValidator,
        expanded: false
      }
    });

    if (updatePayload) {
      updatePayload(name, value, failedValidator);
    }

    this.onChangeCallback(value, valid, init);

  }

  onChangeCallback(value, valid, init) {
    const { onChange } = this.props;

    if (!value && value === '' && init) {
      return;
    }

    if (onChange) {
      onChange(value, valid);
    }
  }

  handleOpen() {
    const { data, returnAs, disabled } = this.props;
    const { value, expanded } = this.state;
    const isReadOnly = this.context.readOnly || this.props.readOnly;
    if (expanded || isReadOnly || disabled) return;

    this.setState(() => {
      return {
        expanded: true,
        highlighted: this.getIndex(value)
      }
    });
  }

  handleClose() {
    this.setState({
      expanded: false
    });
  }

  handleSelect(item, init = false) {
    const { returnAs, viewAs } = this.props;
    const value = returnAs ? item[returnAs] : item.value;
    const displayValue = viewAs ? item[viewAs] : item.label;
    this.update(value, displayValue, init);
  }

  handleClear() {
    this.update(null, null, false);
  }

  handleKeyDown(ev) {
    const { data } = this.props;
    const { highlighted = 0, expanded } = this.state;
    const target = data[highlighted];

    let index = highlighted;

    switch (ev.keyCode) {
      case keycode('enter'):
        expanded && this.handleSelect(target);
        return;
      case keycode('esc'):
      case keycode('tab'):
      case keycode('ctrl'):
      case keycode('alt'):
      case keycode('cmd'):
      case keycode('shift'):
        this.handleClose();
        return;
      case keycode('down'):
        index++;
        ev.preventDefault();
        break;
      case keycode('up'):
        index--;
        ev.preventDefault();
        break;
      default:
        // todo search
        // data.find((i) => i[VIEW_AS] );
        ev.preventDefault();
    }

    if (index > data.length - 1) index = data.length - 1;
    if (index < 0) index = 0;

    this.handleOpen();
    this.setHighlighted(index);
  }

  setHighlighted(index) {
    this.setState(() => {
      return {
        highlighted: index
      }
    });
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
      label,
      name = 'untitled',
      errorMessages,
      className,
      disabled,
      data,
      viewAs,
      returnAs,
      clearButton,
      scrollTrigger,
      style,
      friendlyName,
      helper,
      ...other
    } = this.props;

    const {
      failedValidator,
      valid,
      value,
      displayValue,
      expanded,
      highlighted
    } = this.state;

    const isReadOnly = this.context.readOnly || this.props.readOnly;
    const iconsProps = {readOnly: isReadOnly, label, icons, submitted, standalone, valid, required, validator, disabled, helper };
    const errorProps = { message: !errorPanel && (submitted || standalone) && !disabled && !isReadOnly && ((errors && errors[name]) || resolveError(errorMessages, failedValidator)) };

    const wrapperClasses = classes(
      'valid-select',
      className,
      required && 'required',
      isReadOnly && 'read-only',
      disabled && !isReadOnly && 'disabled',
      valid && 'valid'
    );

    const bodyStyles = styles && [
        styles.base,
        styles.select,
        disabled && !isReadOnly && styles.select.disabled,
        isReadOnly && styles.select.readOnly,
        submitted && !valid && !disabled && !isReadOnly && styles.select.error,
        expanded && styles.select.expanded
      ];

    const clearButtonStyles = styles && [
        styles.base,
        styles.icons,
        styles.icons.clearButton,
        label && styles.icons.withLabel
      ];

    const tab = (disabled || isReadOnly) ? '' : '0';
    const isPlaceholder = !!placeholder && !value;
    const scrollTo = this.getIndex(value);

    return (
      <div style={styles && styles.base} className={wrapperClasses}>
        {label && <label style={styles && styles.label} htmlFor={name}>{label}</label>}
        <div
          onBlur={this.handleClose.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onClick={this.handleOpen.bind(this)}
          tabIndex={tab}
          style={styles && bodyStyles}
          className='valid-select-body'>
          {isPlaceholder &&
          <div className='valid-select-placeholder' style={styles && styles.select.placeholder}>{placeholder}</div>}
          {value &&
          <div className='valid-select-value' style={styles && styles.select.value}>{displayValue || value}</div>}
          {expanded && <Options
            setHighlighted={this.setHighlighted.bind(this)}
            handleSelect={this.handleSelect.bind(this)}
            highlighted={highlighted}
            scroll={scrollTo}
            scrollTrigger={ scrollTrigger || SCROLL_TRIGGER}
            data={data}
            viewAs={viewAs}
            returnAs={returnAs}/>}
        </div>
        { value && clearButton && !disabled && !isReadOnly &&
        <div style={clearButtonStyles}>
          <Icon onClick={ this.handleClear.bind(this)} type='clear' className='valid-select-clear'/>
        </div>
        }
        { !clearButton && <Icons {...iconsProps} /> }
        <Error {...errorProps} />
      </div>
    );
  }
}

Select.contextTypes = {
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