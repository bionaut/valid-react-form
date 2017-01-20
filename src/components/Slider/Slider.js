import React, { Component, PropTypes, cloneElement } from 'react';
import Radium from 'radium';
import classes from '../../utils/classes';
import resolveError from '../../utils/resolveError';
import validate from '../../utils/validate';
import Error from '../Error/Error';
import keycode from 'keycode';

export const DEFAULT_STEP = 1;

@Radium
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value === 0 ? this.props.value : this.props.value || this.props.min,
      failedValidator: null,
      headPosition: 0
    };
  }

  componentDidMount() {
    const { register } = this.context;
    const { value }  = this.state;
    const { name, friendlyName, label, errorMessages }  = this.props;

    if (register) {
      register(name, friendlyName || label, errorMessages);
    }

    this.calibrateUnits(() => {
      this.update(value, true);
    });

    this.mouseUpListener = window.addEventListener('mouseup', this.handleDrop.bind(this));
    this.touchEndListener = window.addEventListener('touchend', this.handleDrop.bind(this));
    this.touchCancelListener = window.addEventListener('touchcancel', this.handleDrop.bind(this));
    this.mouseMoveListener = window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.touchMoveListener = window.addEventListener('touchmove', this.handleMouseMove.bind(this));

    this.resize = window.addEventListener('resize', () => {
      this.calibrateUnits(() => {
        this.update(value);
      });

    });

  }

  componentDidUpdate(prevProps) {
    const prevValue = prevProps.value;
    const prevMin = prevProps.min;
    const prevMax = prevProps.max;
    const { value, min, max } = this.props;
    if (prevValue !== value || prevMax !== max || prevMin !== min) {
      this.calibrateUnits(() => {
        this.update(value);
      });

    }
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { unregister } = this.context;
    if (unregister) {
      unregister(name);
    }
  }

  calibrateUnits(cb) {
    const { min, max } = this.props;
    const step = this.props.step || DEFAULT_STEP;
    const { offsetWidth } = this.railElement;
    const { left } = this.wrapperElement.getBoundingClientRect();
    const unitSize = offsetWidth / Math.abs(max - min);
    const stepSize = unitSize * step;
    const stepsArray = [];

    for (let i = min; i <= max; i++) {
      stepsArray.push(i);
    }

    const stepCount = stepsArray.length;

    this.setState(() => ({
      step,
      units: {
        railWidth: offsetWidth,
        leftOffset: left,
        unitSize,
        stepSize,
        stepCount,
        stepsArray
      }
    }), cb);
  }

  update(value, init) {
    const { units: { stepSize, stepsArray } = {} } = this.state;
    const { updatePayload } = this.context;
    const { name, required, validator, disabled } = this.props;
    const failedValidator = validate(required, validator, value, disabled);
    const valid = !failedValidator;
    const stepIndex = stepsArray.indexOf(value);
    this.setState(() => ({
        value,
        valid,
        failedValidator,
        headPosition: stepIndex * stepSize
      })
    );

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
    if (disabled || isReadOnly) {
      return;
    }
    const { value } = this.state;
    this.update(!value);
  }

  handleGrab(ev) {
    ev.persist();
    this.setState(() => ({
      dragging: true
    }));
  }

  handleDrop() {
    this.setState(() => ({
      dragging: false
    }));
  }

  handleFocus() {
    this.setState(() => ({
      focused: true
    }));
  }

  handleBlur() {
    this.setState(() => ({
      focused: false
    }));
  }

  handleMouseMove(ev) {
    const { dragging } = this.state;
    const { pageX, touches } = ev;
    if (dragging) {
      ev.preventDefault();
      this.handleHeadMove(pageX || touches[0]);
    }
  }

  handleHeadMove(x) {
    const { disabled } = this.props;
    const isReadOnly = this.context.readOnly || this.props.readOnly;
    if (isReadOnly || disabled) return;
    const { value, units: { railWidth, leftOffset } } = this.state;
    if (x - leftOffset >= 0 && x - leftOffset <= railWidth) {
      const virtualHeadPosition = x - leftOffset;
      const nextValue = this.calculateValue(virtualHeadPosition);
      if (value !== nextValue) {
        this.update(nextValue);
      }
    }
  }

  handleKeyDown(ev) {
    const { min, max } = this.props;
    const { value, step } = this.state;
    let nextValue;

    switch (ev.keyCode) {
      case keycode('left'):
        nextValue = (value - step) > min ? value - step : min;
        break;
      case keycode('right'):
        nextValue = (value + step) < max ? value + step : max;
        break;
      default:
        return;
    }
    this.update(nextValue);
    ev.preventDefault();

  }

  handleRailClick(ev) {
    const { pageX } = ev;
    this.handleHeadMove(pageX);
  }

  calculateValue(headPosition) {
    const { units: { stepSize, stepsArray }, step } = this.state;
    const stepIndex = Math.round(headPosition / stepSize) * step;
    return stepsArray[stepIndex];
  }

  generateTicks() {
    const { styles } = this.context;
    const { units: { stepCount, stepSize } = {} } = this.state;

    if (this.railElement) {
      const ticks = [];
      for (let i = 0; i < stepCount; i++) {
        ticks.push(
          <div key={`tick${i}`}
               style={[
                 styles.slider.tick,
                 { left: `${i * stepSize}px` }
               ]}>
          </div>
        );
      }
      return ticks;
    }
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
      style,
      friendlyName,
      min,
      max,
      stepTicks,
      range,
      ...other
    } = this.props;

    const {
      failedValidator,
      valid,
      value,
      headPosition,
      focused
    } = this.state;

    const isReadOnly = this.context.readOnly || this.props.readOnly;
    const errorProps = { message: !errorPanel && !isReadOnly && (submitted || standalone) && !disabled && ((errors && errors[name]) || resolveError(errorMessages, failedValidator)) };

    const wrapperClasses = classes(
      'valid-slider',
      className,
      required && 'required',
      isReadOnly && 'read-only',
      disabled && !isReadOnly && 'disabled',
      valid && 'valid'
    );

    const wrapperStyles = styles && [
        styles.slider.wrapper,
        styles.clearfix
      ];

    const headStyles = styles ?
      { ...styles.slider.head, left: headPosition } :
      { left: headPosition };

    const valueStyles = styles && [
        styles.slider.value
      ];

    const tab = (disabled || isReadOnly) ? '' : '0';

    return (
      <div ref={(el) => this.wrapperElement = el} {...other} style={wrapperStyles} className={wrapperClasses}>
        {label && <div style={styles && styles.label}>{label}</div>}
        <div onClick={this.handleRailClick.bind(this)} ref={(el) => this.railElement = el} style={styles && styles.slider.rail}
             className='valid-slider-rail'>
          <div className='valid-slider-head'
               onFocus={this.handleFocus.bind(this)}
               onBlur={this.handleBlur.bind(this)}
               onMouseDown={this.handleGrab.bind(this)}
               onKeyDown={this.handleKeyDown.bind(this)}
               onTouchStart={this.handleGrab.bind(this)}
               onTouchEnd={this.handleKeyDown.bind(this)}
               tabIndex={tab} style={headStyles}>
            { (isReadOnly || focused) &&
            <div style={valueStyles}>
              <div style={styles && styles.slider.value.main}>{value}</div>
              <div style={styles && styles.slider.value.tip}></div>
            </div> }
          </div>
          { stepTicks && this.generateTicks() }
        </div>
        { range &&
        <div style={styles.slider.range}>
          <span style={styles.slider.range.min}>{min}</span>
          <span style={styles.slider.range.max}>{max}</span>
        </div>
        }
        <Error {...errorProps} />
      </div>
    );
  }
}

Slider.contextTypes = {
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