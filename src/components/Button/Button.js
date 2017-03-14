import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
class Button extends Component {
  render() {
    const { children, fullWidth, style, ...other } = this.props;
    const { styles, readOnly } = this.context;
    const computedStyles = styles && [
        styles.button,
        fullWidth && styles.button.fullWidth,
        style
      ];

    return !readOnly && (
        <button className='valid-button' {...other} style={computedStyles}>
          {children}
        </button>
      );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool
};

Button.contextTypes = {
  readOnly: PropTypes.bool,
  styles: PropTypes.object
};

export default Button;