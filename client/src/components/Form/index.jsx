// src/components/form/index.jsx
import { useState } from 'react';
import './style.css';
import { checkPassword, validateEmail } from '../../utils/helpers';

function Form() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); // Add state to toggle between signup and signin

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'userName') {
      setUserName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email or username is invalid');
      return;
    }
    if (!checkPassword(password)) {
      setErrorMessage(`Choose a more secure password for the account: ${userName}`);
      return;
    }

    try {
      const response = await fetch(isSignUp ? '/api/users' : '/api/users/login', {
        method: isSignUp ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username: userName, password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (isSignUp) {
          alert(`Welcome ${userName}!`);
          setUserName('');
          setPassword('');
          setEmail('');
        } else {
          // Save token and other user data in localStorage or context
          localStorage.setItem('authToken', result.token);
          alert('Login successful');
          // Redirect to the Recipe page on successful login
          window.location.href = '/Recipe';
        }
      } else {
        setErrorMessage(isSignUp ? 'Signup failed' : 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className="container text-center">
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
        />
        {isSignUp && (
          <input
            value={userName}
            name="userName"
            onChange={handleInputChange}
            type="text"
            placeholder="username"
          />
        )}
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="password"
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

export default Form;