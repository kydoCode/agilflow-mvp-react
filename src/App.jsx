import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'; {/*}, Navigate*/} 
import { useStore } from './store';
// import { Auth } from './components/Auth';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard';
import './index.css';
import Login from './pages/login';
import Register from './pages/register';
// import LandingPage from './pages/landingPage';


function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const store = useStore();

  useEffect(() => {
    store.initializeAuth();
  }, []);

  console.log('App.jsx - isAuthenticated:', isAuthenticated); // Add this line

  return (
    <>
    {/* Production settings */}
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter> */}
    {/* Development settings */}
  <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
{/* Added db_dump.sql */}

export default App;
