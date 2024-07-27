// import React from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

import { useState } from 'react';
// import AuthForm from '../components/AuthForm';

function SignIn() {

const [isSignUp, setIsSignUp] = useState(false);

const toggleForm = () => {
  setIsSignUp(!isSignUp);
};

return (
  <div>
    <h1>{isSignUp ? 'Sign Up' : 'Sign In'} here</h1>
    {isSignUp ? <SignUpForm /> : <LoginForm />}
    <button onClick={toggleForm}>
      {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
    </button>
  </div>
);
}

export default SignIn;