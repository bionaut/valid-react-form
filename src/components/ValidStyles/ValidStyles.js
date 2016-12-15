import React, { Component, PropTypes } from 'react';
import mainStyles from './mainStyles';

export default class ValidStyles extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      styles: mainStyles
    }
  };


  render() {
    return this.props.children;
  }
}

ValidStyles.childContextTypes = {
  styles: PropTypes.object
};