import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme";
/* eslint-disable react/prop-types */
function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>)
  
}

export default App;