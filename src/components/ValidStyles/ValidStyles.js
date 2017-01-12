import React, { Component, PropTypes } from 'react';
import mainStyles, { defaultColors, defaultConstants } from './mainStyles';

export default class ValidStyles extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      styles: mainStyles(
        Object.assign({}, defaultColors, this.props.colors),
        Object.assign({}, defaultConstants, this.props.constants)
      )
    }
  };


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

ValidStyles.childContextTypes = {
  styles: PropTypes.object
};