import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import './Signup.css';

function LoginForm() {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
 
const [login, {error}] = useMutation(SIGNIN_USER)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
console.log({...userFormData});
 

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);

} catch (err) {
console.error('Error during form submission:', err);
setErrorMessage(err.message || 'An error occurred');
}
};

  return (
    <div className="container text-center">
      <h1>Log In </h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          value={userFormData.email}
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          value={userFormData.password}
        />
        <button type="submit">Sign In</button>

      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;