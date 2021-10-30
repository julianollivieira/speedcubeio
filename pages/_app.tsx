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
import { SnackbarProvider } from 'notistack';
import { DataProvider } from '@/hooks/useData';

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
            main: '#313740',
          },
          ...(prefersDarkMode ? darkModePalette : lightModePalette),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: '#6b6b6b #2b2b2b',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  backgroundColor: prefersDarkMode ? '#151C24' : '#f2f2f2',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  backgroundColor: prefersDarkMode ? 'rgb(29, 36, 46)' : '#adadad',
                  minHeight: 24,
                  border: `3px solid ${prefersDarkMode ? '#151C24' : '#f2f2f2'}`,
                },
              },
            },
          },
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
        <DataProvider>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </DataProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
