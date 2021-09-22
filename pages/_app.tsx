import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { NextPage } from 'next';
import {
  createTheme,
  CssBaseline,
  PaletteOptions,
  useMediaQuery,
  ThemeProvider,
} from '@mui/material';
import { useMemo } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { SnackbarProvider } from 'notistack';

const darkModePalette: PaletteOptions = {
  background: {
    default: '#151C24',
    paper: '#1D242E',
  },
};

const lightModePalette: PaletteOptions = {
  background: {
    default: '#F2F2F2',
    paper: '#FFFFFF',
  },
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#2D9C93',
          },
          secondary: {
            main: '#873FAD',
          },
          ...(prefersDarkMode ? darkModePalette : lightModePalette),
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <Head>
        <title>Speedcube.io</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
