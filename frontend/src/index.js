import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-aw24h7vl.us.auth0.com"
        clientId="MtKXEbuWerCe2JZaqWMaAXPj5OULvocy"
        redirectUri={window.location.origin}
        audience="https://www.pizza-orders.com"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

