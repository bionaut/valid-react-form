import OptionalIcon from 'react-icons/lib/md/info-outline';
import CheckIcon from 'react-icons/lib/md/check-circle';
import CloseIcon from 'react-icons/lib/md/close';
import InvalidIcon from 'react-icons/lib/md/error-outline';
import classes from '../../utils/classes';
import styles, {errorColor, primaryColor} from '../ValidStyles/mainStyles';

import React from 'react';

const Icon = ({ type, className, ...other }) => {
  const computedClasses = classes('valid-icon', type, className);
  let body;

  switch (type) {
    case 'clear':
    case 'cancel':
    case 'close':
      body = <CloseIcon />;
      break;
    case 'invalid':
    case 'error':
      body = <InvalidIcon fill={errorColor} />;
      break;
    case 'valid':
    case 'check':
      body = <CheckIcon fill={primaryColor} />;
      break;
    case 'optional':
    default:
      body = <OptionalIcon />;
  }

  return (
    <div style={styles.icon} className={computedClasses} {...other} >
      {body}
    </div>
  );
};

export default Icon;