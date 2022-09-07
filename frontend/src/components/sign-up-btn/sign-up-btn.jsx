import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './sign-up-btn.css'

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="sign-up-btn"
      onClick={() => 
            loginWithRedirect({
                scope: "read:orders",
                screen_hint: 'signup'
            })
        }
    >
      Sign Up
    </button>
  );
};

export default SignUpButton;