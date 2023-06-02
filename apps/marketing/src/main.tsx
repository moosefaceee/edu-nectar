// https://github.com/WICG/focus-visible
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '../theme'
import App from './App'
import { AppProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <AppProvider>
          <CSSReset />
          <Global
            styles={css`
              * {
                font-family: ${theme.fonts.body};
              }
            `}
          />
          <CSSReset />
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </AppProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
