import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css'
import router from './app/Routes';
import { store } from './app/store';



import { useEffect } from 'react';
import { fetchMeThunk } from './features/auth/store/authSlice';

const App = () => {
  useEffect(() => {
    store.dispatch(fetchMeThunk());
  }, []);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" />
      <App />
    </Provider>
  </StrictMode>,
);
