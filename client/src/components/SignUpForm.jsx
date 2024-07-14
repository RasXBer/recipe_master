import { useState } from 'react';
import './signup.css';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER, SIGNIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function SignUpForm() {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const [mutate, { error }] = useMutation(isSignUp ? SIGNUP_USER : SIGNIN_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await mutate({
        variables: { ...userFormData },
      });
      
      if (isSignUp && data?.signUp?.token) {
        Auth.login(data.signUp.token);
      } else if (!isSignUp && data?.login?.token) {
        Auth.login(data.login.token);
      } else {
        setErrorMessage('Failed to retrieve authentication token');
      }
    } catch (err) {
      console.error('Error during form submission:', err);
      setErrorMessage(err.message || 'An error occurred');
    }
  };

  return (
    <div className="container text-center">
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
          value={userFormData.email}
        />
        {isSignUp && (
          <input
            name="username"
            onChange={handleInputChange}
            type="text"
            placeholder="username"
            value={userFormData.username}
          />
        )}
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="password"
          value={userFormData.password}
        />
        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
        </button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default SignUpForm;