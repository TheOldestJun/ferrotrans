import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "@/store/store";
import Head from "next/head";

import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// customizing MUI theme
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          width: "unset",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          flexGrow: "unset",
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Supply Chain Management</title>
        <meta
          name="description"
          content="Supply chain management application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
