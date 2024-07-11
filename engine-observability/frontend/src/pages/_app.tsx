'use-client';

/* eslint-disable @next/next/no-css-tags */

import '@/assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/scss/nextjs-dashboard.scss';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import 'highlight.js/styles/default.css';

import { createTheme, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import React from 'react';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { wrapper } from '@/redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#525151FF',
      light: '#525151FF',
      dark: '#525151FF',
      contrastText: '#525151FF',
    },
    secondary: {
      main: '#FCF6F5FF',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const store: any = useStore();
  return (
    <PersistGate
      // eslint-disable-next-line no-underscore-dangle
      persistor={store.__persistor}
      loading={<LoadingSpinner middle />}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PersistGate>
  );
}
export default wrapper.withRedux(MyApp);
