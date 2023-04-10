import { store } from '@store/configureStore';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import AuthWrapper from '@components/misc/AuthWrapper';
import { ComponentWithAuth } from '@types';
import '@styles/globals.scss';

const App = ({ Component, pageProps }: AppProps & ComponentWithAuth) => (
  <Provider store={store}>
    {Component.auth ? (
      <AuthWrapper auth={Component.auth}>
        <Component {...pageProps} />
      </AuthWrapper>
    ) : (
      <Component {...pageProps} />
    )}
  </Provider>
);

export default App;
