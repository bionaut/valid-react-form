import tc from 'tinycolor2';

// colors
export const
  whiteColor = '#fff',
  lightColor = '#dddddd',
  darkColor = '#464646',
  primaryColor = '#38C2FF',
  secondaryColor = '#c5e767',
  errorColor = '#E74C3C';

// constants
export const
  fullWidth = '100%',
  defaultItemSize = 30,
  smallGap = '5px',
  fontSize = '0.9em',
  defaultTransition = 'all 0.2s ease',
  defaultBorder = `1px solid ${lightColor}`,
  focusedBorder = `1px solid ${darkColor}`,
  errorBorder = `1px solid ${errorColor}`,
  defaultRadius = '5px',
  defaultGap = '10px',
  z1 = '1',
  z2 = '2',
  z3 = '3';

const withLabel = {
  marginTop: '1em'
};


export default {
  base: {
    position: 'relative',
    boxSizing: 'border-box',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },

  clearfix: {
    ':after': {
      content: '',
      display: 'table',
      clear: 'both'
    }
  },

  icons: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingRight: smallGap,
    height: `${defaultItemSize}px`,
    withLabel,
    clearButton: {
      cursor: 'pointer'
    }
  },

  icon: {
    display: 'inline-block',
    height: `${defaultItemSize}px`,
    lineHeight: `${defaultItemSize}px`
  },

  iconSvg: {
    position:'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  },

  invalid: {
    border: errorBorder,
    color: errorColor
  },

  field: {
    position: 'relative',
    height: `${defaultItemSize}px`,
    width: fullWidth,
    outline: 'none',
    paddingLeft: smallGap,
    paddingRight: smallGap,
    border: defaultBorder,
    ':focus': {
      border: focusedBorder,
    },
    error: {
      border: errorBorder,
      color: errorColor
    },
    disabled: {
      border: lightColor,
      background: lightColor
    },
    readOnly: {
      border: 'none'
    }
  },

  select: {
    position: 'relative',
    height: `${defaultItemSize}px`,
    width: fullWidth,
    outline: 'none',
    paddingLeft: smallGap,
    paddingRight: smallGap,
    lineHeight: `${defaultItemSize}px`,
    fontSize: fontSize,
    border: defaultBorder,
    expanded: {
      ':focus': {
        border: 'none'
      }
    },
    placeholder: {
      color: tc(darkColor).lighten(20).toString(),
      fontSize
    },
    ':focus': {
      border: focusedBorder,
    },
    error: {
      border: errorBorder,
      color: errorColor
    },
    disabled: {
      border: lightColor,
      background: lightColor
    },
    readOnly: {
      border: 'none'
    },
    value: {
      fontSize
    },
    options: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 'auto',
      width: fullWidth,
      border: defaultBorder,
      boxSizing: 'border-box',
      boxShadow: '0 2px 10px -2px silver',
      zIndex: z1,
      scrollable: {
        height: `${5 * defaultItemSize}px`,
        overflow: 'auto'
      }
    },
    option: {
      position: 'relative',
      width: fullWidth,
      backgroundColor: whiteColor,
      height: `${defaultItemSize}px`,
      lineHeight: `${defaultItemSize}px`,
      paddingLeft: smallGap,
      paddingRight: smallGap,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${lightColor}`,
      cursor: 'pointer',
      fontSize,
      highlighted: {
        backgroundColor: tc(primaryColor).lighten(20).toString()
      }
    },

  },

  label: {
    fontSize,
    paddingLeft: '2px'
  },

  button: {
    height: `${defaultItemSize * 0.8}px`,
    border: 'none',
    outline: 'none',
    marginTop: `${defaultItemSize * 0.1}px`,
    backgroundColor: primaryColor,
    cursor: 'pointer',
    fullWidth: {
      width: fullWidth
    },
    ':hover': {
      backgroundColor: tc(primaryColor).lighten(10).toString(),
    },
    ':focus': {
      backgroundColor: tc(primaryColor).lighten(15).toString(),
    },
    ':active': {
      outline: 'none',
      backgroundColor: primaryColor
    },
    ':disabled': {
      outline: 'none',
      backgroundColor: tc(primaryColor).darken(10).desaturate(70).toString(),
      color: tc(primaryColor).lighten(20).toString(),
    }

  },

  errors: {
    width: fullWidth,
    border: `1px solid ${errorColor}`,
    borderRadius: defaultRadius,
    padding: defaultGap,
    boxSizing: 'border-box'
  },

  error: {
    color: errorColor
  },

  debug: {
    position: 'relative',
    width: fullWidth,
    backgroundColor: tc(primaryColor).lighten(35).toString(),
    padding: defaultGap,
    fontFamily: 'Monospace',
    borderRadius: defaultRadius,
    boxSizing: 'border-box',
    margin: 0,
    payload: {
      wordWrap: 'break-word'
    },
    valid: {
      background: secondaryColor,
      padding: smallGap,
      borderRadius: '5px'
    },
    invalid: {
      background: errorColor,
      color: 'white',
      padding: smallGap,
      borderRadius: '5px'
    }
  },

  toggle: {
    wrapper: {
      position: 'relative',
      width: fullWidth,
      height: `${defaultItemSize}px`,
    },
    label: {
      float: 'left',
      paddingLeft: defaultGap,
      paddingTop: `${defaultItemSize * 0.1}px`,
      lineHeight: `${defaultItemSize * 0.9}px`,
      fontSize,
    },
    body: {
      width: `${defaultItemSize * 1.6}px`,
      float: 'left',
      height: `${defaultItemSize * 0.8}px`,
      border: defaultBorder,
      marginTop: `${defaultItemSize * 0.1}px`,
      borderRadius: `${defaultItemSize}px`,
      outline: 'none',
      cursor: 'pointer',
      ':focus': {
        border: focusedBorder,
      },
      error: {
        border: errorBorder,
        color: errorColor
      },
      disabled: {
        border: lightColor,
        backgroundColor: lightColor
      }
    },
    head: {
      normal: {
        borderRadius: `${defaultItemSize}px`,
        width: `${defaultItemSize * 0.8}px`,
        height: `${defaultItemSize * 0.8}px`,
        backgroundColor: tc(primaryColor).lighten(20).toString(),
        transition: defaultTransition
      },
      active: {
        marginLeft: `${defaultItemSize * 0.8}px`,
        backgroundColor: primaryColor
      },
      error: {
        backgroundColor: errorColor
      },
      disabled: {
        backgroundColor: tc(darkColor).lighten(20).toString(),
      }
    }
  },

  helper: {
    display: 'inline-block',
    cursor: 'pointer',
    height: `${defaultItemSize}px`,
    lineHeight: `${defaultItemSize}px`
  },

  tooltip: {
    position: 'absolute',
    lineHeight: 1,
    fontSize: '0.9em',
    width: 'auto',
    backgroundColor: 'yellow',
    minHeight: `${defaultItemSize}px`,
    right: 0,
    bottom: `${defaultItemSize + 10}px`,
    paddingTop: smallGap,
    paddingLeft: smallGap,
    paddingRight: smallGap,
    paddingBottom: smallGap,
    borderRadius: smallGap,
    after:{
      position: 'absolute',
      width: '10px',
      height: '10px',
      bottom: '-5px',
      right: '10px',
      backgroundColor: 'yellow',
      transform: 'rotateZ(45deg)',
      fontWeight: 400
    }
  }

}