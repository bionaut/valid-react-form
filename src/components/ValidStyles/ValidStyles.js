import React, { Component, PropTypes } from 'react';
import mainStyles, { colors, constants } from './mainStyles';

export default class ValidStyles extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      styles: mainStyles(
        Object.assign({}, colors, this.props.colors),
        Object.assign({}, constants, this.props.constants)
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