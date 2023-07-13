import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import "./index.css"
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/UserContext';
import { white } from './utils/colors';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: '',
          style: {
            padding: '16px',
            background: "rgba(26, 28, 31, 0.94)",
            color: white,
            backdropFilter: "blur(5.7px)",
          },
        }}
      />
      <Router />
    </UserContextProvider>
  </React.StrictMode>
);
