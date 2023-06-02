import { ComponentStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const Input: ComponentStyleConfig = {
  sizes: {
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
        _hover: { borderColor: 'brand.500' },
        marginBottom: 4
      }
    },
    filled: {
      field: {
        background: 'brand.500',
        border: '2px solid',
        borderColor: 'transparent',
        _focus: {
          background: 'transparent',
          borderColor: 'brand.500'
        },
        _hover: {
          background: 'brand.500'
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
  useSystemColorMode: false
}

// 3. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: '#fff5de',
    100: '#f6e0b9',
    200: '#edcc8f',
    300: '#e5b766',
    400: '#dda33b',
    500: '#c48922',
    600: '#986b18',
    700: '#6e4c10',
    800: '#422e04',
    900: '#1b0e00'
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

export { theme }
