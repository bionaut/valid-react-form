import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { VIEW_AS } from './Select';

@Radium
class Options extends Component {

  generateOptions() {
    const { styles } = this.context;
    const {
      setHighlighted,
      handleSelect,
      highlighted,
      children,
      data,
      viewAs = VIEW_AS
    } = this.props;

    const source = children || data;
    return source.map((item, key) => {
      const computedStyles = styles && [
          styles.select.option,
          (highlighted === key) && styles.select.option.highlighted
        ];

      return (
        <div onMouseEnter={() => setHighlighted(key)}
             onClick={() => handleSelect(item)}
             key={key}
             title={item[viewAs]}
             className='valid-select-option'
             style={computedStyles}>{item[viewAs]}
        </div>
      );
    });
  }

  render() {
    const { styles, readOnly } = this.context;
    const { scroll, scrollTrigger, children, data } = this.props;
    const source = children || data;
    const length = source && source.length;

    const compensateStyle = styles && {
      marginTop: `-${scroll * styles.itemSize}px`
    };

    const computedStyles = styles && [
        styles.select.options,
        (length < scrollTrigger) && compensateStyle,
        (length > scrollTrigger) && styles.select.options.scrollable
      ];

    return !readOnly && (
        <div className='valid-select-options' style={computedStyles}>
          {this.generateOptions()}
        </div>
      );
  }
}

Options.contextTypes = {
  styles: PropTypes.object
};

export default Options;