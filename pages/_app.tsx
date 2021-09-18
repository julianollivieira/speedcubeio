import Head from 'next/head';
import type { NextPage } from 'next';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import type { AppProps } from 'next/app';
import { ReactElement, useMemo } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from '@/utils/auth';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }): ReactElement => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          background: {
            // default: '#21252B',
            default: '#151C24',
            paper: 'rgb(29, 36, 46)',
          },
          primary: {
            // main: '#3834C7',
            main: '#2d9c93',
          },
          secondary: {
            main: '#873FAD',
          },
        },
        typography: {
          fontFamily: 'Public Sans',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: '#6b6b6b #2b2b2b',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  backgroundColor: '#151C24',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  backgroundColor: 'rgb(29, 36, 46)',
                  minHeight: 24,
                  border: '3px solid #151C24',
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Public+Sans:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="/styles/globals.css" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
