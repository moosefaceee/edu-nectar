/**
 * https://chakra-ui.com/docs/styled-system/theming/theme
 *
 * Please read through the Default Theme documentation for a clear understanding before extending it,
 * Chakra theming is a powerful tool 🛠
 */

import { ComponentStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react'

/**
 * I'd like to keep this here to serve as a guide! 🦮
 * I'll be over-riding only variants.outline.field styles to match our needs
 *
 * keithburgie (https://github.com/keithburgie) "Okay I did a deep dive. Hope this is helpful to anyone else who comes along.
 * https://github.com/chakra-ui/chakra-ui/issues/2347
 *
 * For Input, styles need to be added to baseStyle.field and not just baseStyle
 * baseStyle styles are overridden by sizes styles (borderRadius, fontSize, height & padding) as well as variant styles (background, border, borderColor, _focus, _hover and sometimes others.)
 * variant styles will override all sizes styles.
 * Setting defaultProps.size and/or defaultProps.variant to null will remove those styles. I don't love this solution because it remove all styles, and I don't want to have to re-set everything because I wanted a different background color.
 * The simplest way to make a basic change, like to a background or border, would be to set it on the variant that you're using:
 *
 * Input: {
 *   variants: {
 *     outline: {
 *       field: {
 *         background: "white",
 *         borderRadius: 0
 *       }
 *     }
 *   }
 * }
 *
 * Here's a component (err, component style object) that shows all defaults"
 */

const Input: ComponentStyleConfig = {
  baseStyle: {
    /**
     * Styles set within { variants } will override base styles
     * Styles set within { sizes } will override base styles
     * The Input component uses "md" size and "outline" variant by default.
     *
     * You can unset those defaults by using null in defaultProps:
     *    defaultProps: {
     *      size: null,
     *      variant: null
     *    },
     *
     * You will lose all default styles this way, including things like focus.
     */
    field: {
      // Add custom base styles here
    }
  },
  sizes: {
    /**
     * Input component will receive "md" styles by default
     * Styles set within { variants } will override styles at all sizes
     *
     * The styles below are what Chakra will use unless replaced.
     */
    xs: {
      field: {
        borderRadius: 'sm',
        fontSize: 'xs',
        height: 6,
        paddingX: 2
      }
    },
    sm: {
      field: {
        borderRadius: 'sm',
        fontSize: 'sm',
        height: 8,
        paddingX: 3
      }
    },
    md: {
      field: {
        borderRadius: 'md',
        fontSize: 'md',
        height: 10,
        paddingX: 4
      }
    },
    lg: {
      field: {
        borderRadius: 'md',
        fontSize: 'lg',
        height: 12,
        paddingX: 4
      }
    }
  },
  variants: {
    /**
     * Input component will use "outline" styles by default.
     * Styles set here will override anything in { baseStyle } and { sizes }
     *
     * The styles below are what Chakra will use unless replaced.
     */
    outline: {
      field: {
        background: 'inherit',
        border: '1px solid',
        borderColor: 'inherit',
        _focus: {
          zIndex: 1,
          borderColor: 'brand.500',
          boxShadow: '0 0 0 1px brand.500'
        },
        _hover: { borderColor: 'gray.300' },
        marginBottom: 4
      }
    },
    filled: {
      field: {
        background: 'gray.100',
        border: '2px solid',
        borderColor: 'transparent',
        _focus: {
          background: 'transparent',
          borderColor: 'brand.500'
        },
        _hover: {
          background: 'gray.300'
        }
      }
    },
    flushed: {
      field: {
        background: 'transparent',
        borderBottom: '1px solid',
        borderColor: 'inherit',
        borderRadius: 0,
        paddingX: 0,
        _focus: {
          borderColor: 'brand.500',
          boxShadow: '0 0 0 1px brand.500'
        }
      }
    },
    unstyled: {
      field: {
        background: 'transparent',
        borderRadius: 'md',
        height: 'auto',
        paddingX: 0
      }
    }
  },
  defaultProps: {
    /**
     * Set either or both of these to null to use only what's in { baseStyle }
     */
    size: 'md',
    variant: 'outline'
  }
}

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

// 3. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}

const components = {
  Input
}

const textStyles = {
  caption: {
    fontSize: '12px',
    lineHeight: '14px'
  },
  p: {
    fontSize: '16px',
    lineHeight: 1.2
  },
  h1: {
    fontSize: ['48px', '72px'],
    fontWeight: 900,
    lineHeight: 1
  },
  h2: {
    fontSize: ['36px', '48px'],
    lineHeight: 1
  },
  h3: {
    fontSize: ['24px', '36px'],
    fontWeight: 'semibold',
    lineHeight: 1.2
  },
  h4: {
    fontSize: ['18px', '24px'],
    lineHeight: ['20px', '24px']
  },
  h5: {
    fontSize: ['16px', '18px'],
    fontWeight: 'semibold',
    lineHeight: 1.2
  }
}

const theme = extendTheme({
  colors,
  config,
  components,
  textStyles
})

export default theme
