import React, { Component } from 'react';
import Radium from 'radium';
import Icon from '../Icon/Icon';
import styles from '../ValidStyles/mainStyles';

@Radium
class Icons extends Component {

  render() {
    const { label, icons, submitted, readOnly, standalone, valid, required, validator, disabled } = this.props;

    const isValid = (validator || required) && valid;
    const isError = (submitted || standalone) && !valid;
    const isOptional = !required && !validator;

    const computedStyles = [
      styles.base,
      styles.icons,
      label && styles.icons.withLabel,
    ];

    return !!icons && !disabled && !readOnly && (
        <div style={computedStyles} className='icons'>
          { isError && <Icon type='error'/> }
          { isValid && <Icon type='valid'/> }
          { isOptional && <Icon type='optional'/> }
        </div>
      );  }
}

export default Icons;