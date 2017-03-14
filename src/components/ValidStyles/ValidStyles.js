import React, { Component, PropTypes } from 'react';
import mainStyles, { Styles } from './mainStyles';

export default class ValidStyles extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      styles: mainStyles(new Styles(this.props.customStyles))
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