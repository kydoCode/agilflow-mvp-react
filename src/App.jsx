import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useStore } from './store';
// import { Auth } from './components/Auth';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard';
import './index.css';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const store = useStore();

  useEffect(() => {
    store.initializeAuth();
    console.log('App.jsx useEffect - initializeAuth called');
  }, []);

  console.log('App.jsx - isAuthenticated:', isAuthenticated);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
