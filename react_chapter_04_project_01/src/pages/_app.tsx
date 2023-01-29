import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";

import { makeServer } from "../services/mirage";

import { theme } from "../styles/theme";

import AppProvider from "../hooks";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
