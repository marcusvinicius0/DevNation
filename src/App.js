import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from "./routes";
import { ToastContainer } from 'react-toastify';

import AuthProvider from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <MyRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
