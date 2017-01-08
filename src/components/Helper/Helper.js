import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import HelpIcon from 'react-icons/lib/md/help';
import Tooltip from '../Tooltip/Tooltip';

@Radium
class Helper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: false
    }
  }

  toggleTooltip() {
    this.setState(({ tooltip }) => {
      return {
        tooltip: !tooltip
      }
    });
  }

  render() {
    const { text, children } = this.props;
    const { tooltip } = this.state;
    const { styles } = this.context;

    const computedStyles = styles && [
        styles.helper
      ];

    return (
      <div className='valid-helper' onClick={this.toggleTooltip.bind(this)} style={computedStyles}>
        { tooltip && <Tooltip text={text || children}/> }
        <HelpIcon style={styles && styles.iconSvg} />
      </div>
    );
  }
}

Helper.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
};

Helper.contextTypes = {
  styles: PropTypes.object
};

export default Helper;