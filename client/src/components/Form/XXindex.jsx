import { useState } from 'react';
import './style.css';

// Import a helper function that will check if the email is valid
import { checkPassword, validateEmail } from '../../utils/helpers';

function Form() {
  // Create state variables for the fields in the form

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  
 // Create a password variable and a function "setPassword" using useState
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // set the state of either email, username, and password
   
    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'userName') {
      setUserName(inputValue);
    } else if (inputType === 'password') {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email or username is invalid');
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
      // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
    }
    if (!checkPassword(password)) {
      setErrorMessage(
        `Choose a more secure password for the account: ${userName}`
      );
      return;
    }

    // If successful, we want to clear out the input after registration.
    setUserName('');
    // Set the password back to an empty string after the user clicks submit
    setPassword(''); 
    setEmail('');
    alert(`Hello ${userName}`);
  };

  return (
    <div className="container text-center">
      <h1>Hello {userName}</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
        />
        <input
          value={userName}
          name="userName"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
        />
        {/* Add another input field with a value, name, type, and placeholder of "password" */}
        {/* Add a `onChange` attribute with a value of `handleInputChange` */}
        <input
          value={password} // Step 4: Bind password value
          name="password" // Step 4: Set name to identify input
          onChange={handleInputChange} // Step 4: Handle change
          type="password" // Step 4: Set type to password
          placeholder="password" // Step 4: Placeholder text
        />
        <button type="submit">
          Submit
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
