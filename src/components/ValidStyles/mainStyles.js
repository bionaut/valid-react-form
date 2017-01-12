import tc from 'tinycolor2';

export const defaultColors = {
  primaryColor: '#38C2FF',
  secondaryColor: '#c5e767',
  lightColor: '#dddddd',
  darkColor: '#464646',
  tooltipColor: '#ffdf81',
  errorColor: '#E74C3C'
};

export const defaultConstants = {
  defaultItemSize: 30,
  gap: '10px',
  smallGap: '5px',
  fontSize: '0.9em',
  defaultTransition: 'all 0.2s ease',
  defaultRadius: '5px'
};

export default function (colors, constants) {

  const {
    primaryColor,
    secondaryColor,
    lightColor,
    darkColor,
    tooltipColor,
    errorColor
  } = colors;

  const {
    defaultItemSize,
    smallGap,
    fontSize,
    defaultTransition,
    defaultRadius,
    gap,
  } = constants;

  const fullWidth = '100%';
  const z1 = '1';
  const z2 = '2';

  const withLabel = {
    marginTop: '1em'
  };

  return {
    colors,
    constants,
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
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    },

    invalid: {
      border: `1px solid ${errorColor}`,
      color: errorColor
    },

    field: {
      position: 'relative',
      height: `${defaultItemSize}px`,
      width: fullWidth,
      outline: 'none',
      paddingLeft: smallGap,
      paddingRight: smallGap,
      border: `1px solid ${lightColor}`,
      ':focus': {
        border: `1px solid ${darkColor}`,
      },
      error: {
        border: `1px solid ${errorColor}`,
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
      border: `1px solid ${lightColor}`,
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
        border: `1px solid ${darkColor}`,
      },
      error: {
        border: `1px solid ${errorColor}`,
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
        border: `1px solid ${lightColor}`,
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
        backgroundColor: tc(lightColor).lighten(30).toString(),
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
      padding: gap,
      boxSizing: 'border-box'
    },

    error: {
      color: errorColor
    },

    debug: {
      position: 'relative',
      width: fullWidth,
      backgroundColor: tc(primaryColor).lighten(35).toString(),
      padding: gap,
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
    slider: {
      wrapper: {
        position: 'relative',
        width: fullWidth,
        height: `${defaultItemSize}px`,
        cursor: 'pointer'
      },
      value: {
        position: 'absolute',
        boxSizing: 'border-box',
        userSelect: 'none',
        left: 0,
        top: `-${defaultItemSize}px`,
        marginTop: `-${defaultItemSize / 4}px`,
        marginLeft: `-${defaultItemSize / 4}px`,
        height: `${defaultItemSize }px`,
        lineHeight: `${defaultItemSize }px`,
        fontSize: '0.6em',
        minWidth: `${defaultItemSize}px`,
        textAlign: 'center',
        backgroundColor: tc(primaryColor).lighten(20).toString(),
        borderRadius: '50%',
        color: darkColor,
        main: {
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          zIndex: z2
        },
        tip: {
          position: 'absolute',
          bottom: `-${defaultItemSize / 10 }px`,
          left: '50%',
          width: `${defaultItemSize / 2 }px`,
          height: `${defaultItemSize / 2 }px`,
          transform: 'translateX(-50%) rotateZ(45deg)',
          backgroundColor: tc(primaryColor).lighten(20).toString(),
          zIndex: z1
        }
      },
      rail: {
        position: 'relative',
        top: '50%',
        width: '100%',
        marginTop: `-${defaultItemSize / 20}px`,
        height: `${defaultItemSize / 10}px`,
        backgroundColor: tc(primaryColor).lighten(20).toString()
      },
      tick: {
        position: 'absolute',
        width: '1px',
        height: `${defaultItemSize / 4}px`,
        transform: 'translateY(-50%)',
        top: '50%',
        backgroundColor: tc(primaryColor).lighten(20).toString()

      },
      head: {
        position: 'absolute',
        boxSizing: 'border-box',
        width: `${defaultItemSize / 2 }px`,
        height: `${defaultItemSize / 2 }px`,
        backgroundColor: tc(primaryColor).lighten(20).toString(),
        top: `-${(defaultItemSize / 4) - defaultItemSize / 20 }px`,
        transition: 'transform .3s ease',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        zIndex: z1,
        ':focus': {
          outline: 'none',
          transform: 'translateX(-50%) scale(1.2)',
          backgroundColor: primaryColor,
          top: `-${(defaultItemSize / 4) - (defaultItemSize / 20)}px`,
        }
      },
      range: {
        position: 'relative',
        top: '100%',
        width: '100%',
        height: `${defaultItemSize / 2 }px`,
        fontSize: `${defaultItemSize / 2 }px`,
        marginTop: `-${defaultItemSize / 4 }px`,
        min: {
          float: 'left'
        },
        max: {
          float: 'right'
        }
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
        paddingLeft: gap,
        paddingTop: `${defaultItemSize * 0.1}px`,
        lineHeight: `${defaultItemSize * 0.9}px`,
        fontSize,
      },
      body: {
        width: `${defaultItemSize * 1.6}px`,
        float: 'left',
        height: `${defaultItemSize * 0.8}px`,
        border: `1px solid ${lightColor}`,
        marginTop: `${defaultItemSize * 0.1}px`,
        borderRadius: `${defaultItemSize}px`,
        outline: 'none',
        cursor: 'pointer',
        ':focus': {
          border: `1px solid ${darkColor}`,
        },
        error: {
          border: `1px solid ${errorColor}`,
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
      backgroundColor: tooltipColor,
      minHeight: `${defaultItemSize}px`,
      right: 0,
      bottom: `${defaultItemSize + 10}px`,
      paddingTop: smallGap,
      paddingLeft: smallGap,
      paddingRight: smallGap,
      paddingBottom: smallGap,
      borderRadius: smallGap,
      after: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        bottom: '-5px',
        right: '10px',
        backgroundColor: tooltipColor,
        transform: 'rotateZ(45deg)',
        fontWeight: 400
      }
    }
  }
}