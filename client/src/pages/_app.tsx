import dynamic from 'next/dynamic';
import NextProgressBar from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { PersistGate } from 'redux-persist/integration/react';
import AuthProvider from '@components/providers/AuthProvider';
import { AppAuthed } from '@types';
import { persistor, store } from '@store/configureStore';
import '@styles/globals.scss';

const queryClient = new QueryClient();

const AuthWrapper = dynamic(() => import('@components/misc/AuthWrapper'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppAuthed) => (
  <QueryClientProvider client={queryClient}>
    <NextProgressBar
      color="#fF7652"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
    />
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthProvider>
          {Component.auth ? (
            <AuthWrapper auth={Component.auth}>
              <Component {...pageProps} />
            </AuthWrapper>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthProvider>
        <ReduxToastr
          newestOnTop={false}
          preventDuplicates
          progressBar
          closeOnToastrClick
          position="bottom-right"
          timeOut={4000}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

export default App;
