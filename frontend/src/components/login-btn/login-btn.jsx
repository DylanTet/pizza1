import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './login-btn.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="login-btn"
      onClick={() => loginWithRedirect({scope: "read:orders"})}
    >
      Log In
    </button>
  );
};

export default LoginButton;