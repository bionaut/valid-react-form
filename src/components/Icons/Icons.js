import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Icon from '../Icon/Icon';
import Helper from '../Helper/Helper';

@Radium
class Icons extends Component {

  render() {
    const { styles } = this.context;
    const { label, icons, submitted, readOnly, standalone, valid, required, validator, disabled, helper } = this.props;

    const isValid = (validator || required) && valid;
    const isError = (submitted || standalone) && !valid;
    const isOptional = !required && !validator;

    const computedStyles = styles && [
        styles.base,
        styles.icons,
        label && styles.icons.withLabel
      ];

    return !!(icons || helper ) && !disabled && !readOnly && (
        <div style={computedStyles} className='icons'>
          { isError && <Icon type='error'/> }
          { isValid && <Icon type='valid'/> }
          { isOptional && <Icon type='optional'/> }
          { !valid && helper && <Helper text={helper}/>}
        </div>
      );
  }
}

Icons.contextTypes = {
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

export default Icons;