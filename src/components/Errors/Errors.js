import React, {PropTypes} from 'react';
import Error from '../Error/Error'

const Errors = ({ messages }, {styles}) => {
  const isMessages = !!messages && messages.length !== 0;
  return isMessages && (
      <div style={styles && styles.errors} className='valid-form-errors'>
        {messages
          .map((m, k) => <Error key={k} message={m}/>)}
      </div>
    );
};

Errors.contextTypes = {
  styles: PropTypes.object
};

export default Errors;