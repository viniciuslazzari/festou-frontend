import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import "./index.css"
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: '',
          style: {
            padding: '16px',
            background: "rgba(26, 28, 31, 0.94)",
            color: "white",
            backdropFilter: "blur(5.7px)",
          },
        }}
        containerStyle={{
          top: 50,
          left: 50,
          bottom: 50,
          right: 50,
        }}
      />
      <Router />
    </UserContextProvider>
  </React.StrictMode>
);
