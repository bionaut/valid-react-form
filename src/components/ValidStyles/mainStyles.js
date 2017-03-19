import tc from 'tinycolor2';

export class Styles {
  constructor(custom = {} ){
    this.primaryColor = custom.primaryColor || '#38C2FF';
    this.secondaryColor = custom.secondaryColor || '#c5e767';
    this.lightColor = custom.lightColor || '#dddddd';
    this.borderColor = custom.borderColor || '#dddddd';
    this.darkColor = custom.darkColor || '#464646';
    this.tooltipColor = custom.tooltipColor || '#ffdf81';
    this.errorColor = custom.errorColor || '#E74C3C';
    this.componentBackground = custom.componentBackground || '#ffffff';
    this.itemSize = custom.itemSize || 30;
    this.borderRadius = custom.borderRadius || 2;
    this.borderWidth = custom.borderWidth || 1;
    this.gap = custom.gap || '10px';
    this.smallGap = custom.smallGap || '5px';
    this.fontSize = custom.fontSize || '0.9em';
    this.transition = custom.transition || 'all 0.2s ease';
    this.fontFamily = custom.fontFamily || 'Sans-serif';

    this.border = `${this.borderWidth}px solid ${this.borderColor}`;
    this.focusBorder = `${this.borderWidth}px solid ${this.darkColor}`;
    this.errorBoarder = `${this.borderWidth}px solid ${this.errorColor}`;
    this.boxShadow = `0 2px 10px -2px ${this.darkColor}`;
  }
}

export default function (styles) {

  const {
    primaryColor,
    secondaryColor,
    lightColor,
    darkColor,
    tooltipColor,
    errorColor,
    componentBackground,
    itemSize,
    borderRadius,
    gap,
    smallGap,
    fontSize,
    transition,
    border,
    focusBorder,
    errorBoarder,
    boxShadow,
    fontFamily
  } = styles;

  const fullWidth = '100%';
  const z1 = '1';
  const z2 = '2';

  return {
    ...styles,
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
      height: `${itemSize}px`,
      lineHeight: `${itemSize}px`
    },

    icon: {
      display: 'inline-block',
      height: `${itemSize}px`,
      lineHeight: `${itemSize}px`
    },

    iconSvg: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-100%)'
    },

    invalid: {
      border: errorBoarder,
      color: errorColor
    },

    field: {
      position: 'relative',
      height: `${itemSize}px`,
      width: fullWidth,
      outline: 'none',
      paddingLeft: smallGap,
      paddingRight: smallGap,
      backgroundColor: componentBackground,
      border,
      fontSize,
      fontFamily,
      borderRadius,
      ':focus': {
        border: focusBorder,
      },
      error: {
        border: errorBoarder,
        color: errorColor
      },
      disabled: {
        border,
        backgroundColor: lightColor
      },
      readOnly: {
        border: 'none',
        backgroundColor: 'transparent'
      }
    },

    select: {
      position: 'relative',
      height: `${itemSize}px`,
      width: fullWidth,
      outline: 'none',
      paddingLeft: smallGap,
      paddingRight: smallGap,
      lineHeight: `${itemSize}px`,
      backgroundColor: componentBackground,
      fontSize,
      border,
      fontFamily,
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
        border: focusBorder,
      },
      error: {
        border: errorBoarder,
        color: errorColor
      },
      disabled: {
        border,
        backgroundColor: lightColor
      },
      readOnly: {
        border: 'none',
        backgroundColor: 'transparent'
      },
      value: {
        fontSize,
        fontFamily
      },
      options: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 'auto',
        width: fullWidth,
        boxSizing: 'border-box',
        zIndex: z1,
        boxShadow,
        border,
        scrollable: {
          height: `${5 * itemSize}px`,
          overflow: 'auto'
        }
      },
      option: {
        position: 'relative',
        width: fullWidth,
        backgroundColor: tc(lightColor).lighten(30).toString(),
        height: `${itemSize}px`,
        lineHeight: `${itemSize}px`,
        paddingLeft: smallGap,
        paddingRight: smallGap,
        boxSizing: 'border-box',
        borderBottom: border,
        cursor: 'pointer',
        fontSize,
        fontFamily,
        highlighted: {
          backgroundColor: tc(primaryColor).lighten(20).toString()
        }
      },
    },

    label: {
      fontSize,
      fontFamily,
      paddingLeft: '2px'
    },

    button: {
      height: `${itemSize * 0.8}px`,
      border: 'none',
      outline: 'none',
      marginTop: `${itemSize * 0.1}px`,
      backgroundColor: primaryColor,
      cursor: 'pointer',
      fontSize,
      fontFamily,
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
      border: errorBoarder,
      borderRadius,
      padding: gap,
      boxSizing: 'border-box'
    },

    error: {
      fontSize,
      fontFamily,
      lineHeight: `${itemSize}px`,
      color: errorColor
    },

    debug: {
      position: 'relative',
      width: fullWidth,
      backgroundColor: tc(primaryColor).lighten(35).toString(),
      padding: gap,
      fontFamily: 'Monospace',
      borderRadius,
      boxSizing: 'border-box',
      margin: 0,
      payload: {
        wordWrap: 'break-word'
      },
      valid: {
        backgroundColor: secondaryColor,
        padding: smallGap,
        borderRadius: '5px'
      },
      invalid: {
        backgroundColor: errorColor,
        color: 'white',
        padding: smallGap,
        borderRadius: '5px'
      }
    },

    slider: {
      wrapper: {
        position: 'relative',
        width: fullWidth,
        height: `${itemSize}px`,
        cursor: 'pointer'
      },
      value: {
        position: 'absolute',
        boxSizing: 'border-box',
        userSelect: 'none',
        left: 0,
        top: `-${itemSize}px`,
        marginTop: `-${itemSize / 4}px`,
        marginLeft: `-${itemSize / 4}px`,
        height: `${itemSize }px`,
        lineHeight: `${itemSize }px`,
        minWidth: `${itemSize}px`,
        textAlign: 'center',
        backgroundColor: tc(primaryColor).lighten(20).toString(),
        borderRadius: '50%',
        color: darkColor,
        fontSize,
        fontFamily,
        main: {
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          zIndex: z2
        },
        tip: {
          position: 'absolute',
          bottom: `-${itemSize / 10 }px`,
          left: '50%',
          width: `${itemSize / 2 }px`,
          height: `${itemSize / 2 }px`,
          transform: 'translateX(-50%) rotateZ(45deg)',
          backgroundColor: tc(primaryColor).lighten(20).toString(),
          zIndex: z1
        }
      },
      rail: {
        position: 'relative',
        top: '50%',
        width: '100%',
        marginTop: `-${itemSize / 20}px`,
        height: `${itemSize / 10}px`,
        backgroundColor: tc(primaryColor).lighten(20).toString()
      },
      tick: {
        position: 'absolute',
        width: '1px',
        height: `${itemSize / 4}px`,
        transform: 'translateY(-50%)',
        top: '50%',
        backgroundColor: tc(primaryColor).lighten(20).toString()

      },
      head: {
        position: 'absolute',
        boxSizing: 'border-box',
        width: `${itemSize / 2 }px`,
        height: `${itemSize / 2 }px`,
        backgroundColor: tc(primaryColor).lighten(20).toString(),
        top: `-${(itemSize / 4) - itemSize / 20 }px`,
        transition: 'transform .3s ease',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        zIndex: z1,
        ':focus': {
          outline: 'none',
          transform: 'translateX(-50%) scale(1.2)',
          backgroundColor: primaryColor,
          top: `-${(itemSize / 4) - (itemSize / 20)}px`,
        }
      },
      range: {
        position: 'relative',
        top: '100%',
        width: '100%',
        height: `${itemSize / 2 }px`,
        fontSize: `${itemSize / 2 }px`,
        marginTop: `-${itemSize / 4 }px`,
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
        height: `${itemSize}px`
      },
      label: {
        float: 'left',
        paddingLeft: smallGap,
        paddingTop: `${itemSize * 0.1}px`,
        lineHeight: `${itemSize * 0.9}px`,
        fontSize,
      },
      body: {
        width: `${itemSize * 1.6}px`,
        float: 'left',
        height: `${itemSize * 0.8}px`,
        marginTop: `${itemSize * 0.1}px`,
        borderRadius: `${itemSize}px`,
        outline: 'none',
        backgroundColor: componentBackground,
        marginRight: smallGap,
        cursor: 'pointer',
        border,
        ':focus': {
          border: focusBorder,
        },
        error: {
          border: errorBoarder,
          color: errorColor
        },
        disabled: {
          border,
          backgroundColor: lightColor
        }
      },
      head: {
        normal: {
          borderRadius: `${itemSize}px`,
          width: `${itemSize * 0.8}px`,
          height: `${itemSize * 0.8}px`,
          backgroundColor: tc(primaryColor).lighten(20).toString(),
          transition
        },
        active: {
          marginLeft: `${itemSize * 0.8}px`,
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
      height: `${itemSize}px`,
      lineHeight: `${itemSize}px`
    },

    tooltip: {
      position: 'absolute',
      lineHeight: 1,
      fontSize: '0.9em',
      width: 'auto',
      backgroundColor: tooltipColor,
      minHeight: `${itemSize}px`,
      right: 0,
      bottom: `${itemSize + 10}px`,
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