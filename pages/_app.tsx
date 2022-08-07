import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import theme from "../theme"

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>)
  
}

export default App;