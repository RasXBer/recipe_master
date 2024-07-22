// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token or cookies
    localStorage.removeItem('id_token');
    // Redirect to Sign In page or Home
    navigate('/SignIn');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;