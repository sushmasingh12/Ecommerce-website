import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import router from './app/Routes';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './shared/components/ErrorBoundary';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
