import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toastify.css";
import "../styles/global.css";
import NextNProgress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      green: {
        "50": "#F8FAEA",
        "100": "#ECF2C5",
        "200": "#E0E9A0",
        "300": "#D5E17A",
        "400": "#C9D855",
        "500": "#BDD02F",
        "600": "#97A626",
        "700": "#717D1C",
        "800": "#4B5313",
        "900": "#262A09",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Exsto Academy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ToastContainer limit={3} />
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
