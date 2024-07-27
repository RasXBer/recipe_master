// src/components/NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth'; // Import AuthService
import LogoutButton from './LogoutButton';



function NavBar() {
  const currentPage = useLocation().pathname;
  // const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const isLoggedIn = Auth.loggedIn(); 

  const handleLogout = () => {
    Auth.logout(); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Recipe Master</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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
                    to="/Comments"
                    className={currentPage === '/Blog' ? 'nav-link active' : 'nav-link'}
                  >
                    Comments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/stored-recipes"
                    className={currentPage === '/stored-recipes' ? 'nav-link active' : 'nav-link'}
                  >
                    View Stored Recipes
                  </Link>
                </li>
              </>
            )}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link to="/signin" className={currentPage === '/signin' ? 'nav-link active' : 'nav-link'}>
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
        </div>
      </div>
    </nav>
  );
}

export default NavBar;