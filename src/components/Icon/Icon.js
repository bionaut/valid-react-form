import React, { Component, PropTypes } from 'react';
import OptionalIcon from 'react-icons/lib/md/info-outline';
import CheckIcon from 'react-icons/lib/md/check-circle';
import CloseIcon from 'react-icons/lib/md/close';
import InvalidIcon from 'react-icons/lib/md/error-outline';
import classes from '../../utils/classes';

class Icon extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { styles } = this.context;
    const { type, className, ...other } = this.props;
    const computedClasses = classes('valid-icon', type, className);
    let body;

    switch (type) {
      case 'clear':
      case 'cancel':
      case 'close':
        body = <CloseIcon style={styles && styles.iconSvg}/>;
        break;
      case 'invalid':
      case 'error':
        body = <InvalidIcon fill={styles && styles.colors.errorColor} style={styles && styles.iconSvg}/>;
        break;
      case 'valid':
      case 'check':
        body = <CheckIcon fill={styles && styles.colors.primaryColor} style={styles && styles.iconSvg}/>;
        break;
      case 'optional':
      default:
        body = <OptionalIcon style={styles && styles.iconSvg}/>;
    }

    return (
      <div style={styles && styles.icon} className={computedClasses} {...other} >
        {body}
      </div>
    );
  }

}

Icon.contextTypes = {
  styles: PropTypes.object
};


export default Icon;