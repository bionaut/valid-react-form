import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
class Button extends Component {
  render() {
    const { children, fullWidth, ...other } = this.props;
    const { styles, readOnly } = this.context;
    const computedStyles = styles && [
        styles.button,
        fullWidth && styles.button.fullWidth
      ];

    return !readOnly && (
        <button className='valid-button' {...other} style={computedStyles}>
          {children}
        </button>
      );
  }
}

Button.contextTypes = {
  readOnly: PropTypes.bool,
  styles: PropTypes.object
};

export default Button;