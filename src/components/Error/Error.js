import React, {PropTypes} from 'react';

const Error = ({ message }, {styles}) => {
  return !!message && (
      <div style={styles && styles.error} className='valid-form-error'>
        {message}
      </div>
    );
};

Error.contextTypes = {
  styles: PropTypes.object
};


export default Error;