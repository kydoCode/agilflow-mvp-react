import React from 'react';
import { useStore } from './store';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Toaster } from 'react-hot-toast';
import './index.css';

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <>
      <Toaster position="top-right" />
      {isAuthenticated ? <Dashboard /> : <Auth />}
    </>
  );
}

export default App;