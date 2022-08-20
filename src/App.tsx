import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRoutes from './routes';

import AuthProvider from './contexts/auth';
import CompanyProvider from './contexts/company';
import UserSignedProvider from './contexts/signed';
import PublicationsProvider from './hooks/usePublications';

function App() {
  return (
    <UserSignedProvider>
      <AuthProvider>
        <CompanyProvider>
          <PublicationsProvider>
            <BrowserRouter>
              <ToastContainer autoClose={3000} />
              <MyRoutes />
            </BrowserRouter>
          </PublicationsProvider>
        </CompanyProvider>
      </AuthProvider>
    </UserSignedProvider>
  );
}

export default App;
