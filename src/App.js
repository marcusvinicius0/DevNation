import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from "./routes";
import { ToastContainer } from 'react-toastify';

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
