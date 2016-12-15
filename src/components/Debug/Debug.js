import React, { PropTypes } from 'react';

const Debug = ({ debug, payload, valid, submitted }, { styles }) => {
  const validStyle = styles && (valid ? styles.debug.valid : styles.debug.invalid);
  const submitStyle = styles && (submitted ? styles.debug.valid : styles.debug.invalid);

  return !!debug && (
      <div style={styles && styles.debug} className="valid-form-debug">
        <p style={styles && styles.debug.payload}>{JSON.stringify(payload)}</p>
        <p>Form is:<span style={validStyle}>{valid ? 'valid' : 'invalid'}</span></p>
        <p>Submit button was:<span style={submitStyle}>{submitted ? 'pressed' : 'not pressed'}</span></p>
      </div>
    );
};

Debug.contextTypes = {
  styles: PropTypes.object
};


export default Debug;