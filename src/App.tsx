import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRoutes from './routes';

import AuthProvider from './contexts/auth';
import PublicationsProvider from './hooks/usePublications';

function App() {
  return (
    <AuthProvider>
      <PublicationsProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <MyRoutes />
        </BrowserRouter>
      </PublicationsProvider>
    </AuthProvider>
  );
}

export default App;
