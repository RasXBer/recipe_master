// src/components/NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth'; // Import AuthService
import LogoutButton from './LogoutButton';



function NavBar() {
  const currentPage = useLocation().pathname;
  // const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const isLoggedIn = Auth.loggedIn(); // Check authentication status

  const handleLogout = () => {
    Auth.logout(); // Call logout method from AuthService
  };

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/About"
          className={currentPage === '/About' ? 'nav-link active' : 'nav-link'}
        >
          About
        </Link>
      </li>
      {isLoggedIn && (
        <>
          <li className="nav-item">
            <Link
              to="/Recipe"
              className={currentPage === '/Recipe' ? 'nav-link active' : 'nav-link'}
            >
              Recipe
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Blog"
              className={currentPage === '/Blog' ? 'nav-link active' : 'nav-link'}
            >
              Blog
            </Link>
          </li>
        </>
      )}
      {!isLoggedIn ? (
        <li className="nav-item">
          <Link to="/SignIn" className={currentPage === '/SignIn' ? 'nav-link active' : 'nav-link'}>
            Sign-In
          </Link>
        </li>
      ) : (
        <li className="nav-item">
            <LogoutButton className="nav-link" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </li>
      )}
    </ul>
  );
}

export default NavBar;