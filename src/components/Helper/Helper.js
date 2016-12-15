import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
class Helper extends Component {

  render() {
    const {} = this.props;
    const { styles } = this.context;

    const computedStyles = styles && [
        styles.helper
      ];

    return (
      <div style={computedStyles}>

      </div>
    );
  }
}

Helper.contextTypes = {
  styles: PropTypes.object
};

export default Helper;