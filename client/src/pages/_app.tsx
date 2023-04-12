import { persistor, store } from '@store/configureStore';
import dynamic from 'next/dynamic';
import NextProgressBar from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { PersistGate } from 'redux-persist/integration/react';
import { AppAuthed } from '@types';
import '@styles/globals.scss';

const AuthWrapper = dynamic(() => import('@components/misc/AuthWrapper'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppAuthed) => (
  <>
    <NextProgressBar
      color="#fF7652"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
    />
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {Component.auth ? (
          <AuthWrapper auth={Component.auth}>
            <Component {...pageProps} />
          </AuthWrapper>
        ) : (
          <Component {...pageProps} />
        )}
        <ReduxToastr
          newestOnTop={false}
          preventDuplicates
          progressBar
          closeOnToastrClick
          timeOut={4000}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </PersistGate>
    </Provider>
  </>
);

export default App;
