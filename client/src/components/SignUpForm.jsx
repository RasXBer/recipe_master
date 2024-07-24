import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import './Signup.css';

function SignUpForm() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

const [signUp, {error}] = useMutation(SIGNUP_USER)

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
console.log({...userFormData});
 

    try {
      const { data } = await signUp({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.signUp.token);
    

} catch (err) {
console.error('Error during form submission:', err);
setErrorMessage(err.message || 'An error occurred');
}
};

  return (
    <div className="container text-center">
      <h1>Sign Up </h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          value={userFormData.email}
        />
          <input
            name="username"
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            value={userFormData.username}
          />
      
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          value={userFormData.password}
        />
        <button type="submit">Sign Up</button>

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