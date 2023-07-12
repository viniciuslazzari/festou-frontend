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
      <Toaster position="bottom-right"/>
      <Router />
    </UserContextProvider>
  </React.StrictMode>
);
