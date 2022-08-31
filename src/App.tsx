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
    <BrowserRouter>
      <UserSignedProvider>
        <AuthProvider>
          <CompanyProvider>
            <PublicationsProvider>
              <ToastContainer autoClose={3000} />
              <MyRoutes />
            </PublicationsProvider>
          </CompanyProvider>
        </AuthProvider>
      </UserSignedProvider>
    </BrowserRouter>
  );
}

export default App;
