import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER, SIGNIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import './Signup.css';

function SignUpForm() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const [mutate] = useMutation(isSignUp ? SIGNUP_USER : SIGNIN_USER);

  // const [mutate,{error}] = useMutation(SIGNUP_USER );

  // const [mutate] = useMutation(SIGNUP_USER );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
console.log({...userFormData});
 

    try {
      const { data } = await mutate({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.signUp.token);
    
  // Check if data is defined and has the expected structure
//  if (data) {
//   if (isSignUp && data.signUp && data.signUp.token) {
//     Auth.login(data.signUp.token); // Use Auth.login to store token
//   } else if (!isSignUp && data.login && data.login.token) {
//     Auth.login(data.login.token); // Use Auth.login to store token
//   } else {
//     setErrorMessage('Failed to retrieve authentication token');
//   }
// } else {
//   setErrorMessage('Failed to retrieve data from server');
// }
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
          placeholder="Email"
          value={userFormData.email}
        />
        {isSignUp && (
          <input
            name="username"
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            value={userFormData.username}
          />
        )}
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          value={userFormData.password}
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
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