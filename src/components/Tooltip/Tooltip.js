import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
class Tooltip extends Component {

  render() {
    const { text } = this.props;
    const { styles } = this.context;

    const computedStyles = styles && [
        styles.tooltip
      ];

    return (
      <div className='valid-tooltip' style={computedStyles}>
        {text}
        <div className='valid-tooltip-triangle' style={styles.tooltip.after}></div>
      </div>
    );
  }
}

Tooltip.contextTypes = {
  styles: PropTypes.object
};

export default Tooltip;