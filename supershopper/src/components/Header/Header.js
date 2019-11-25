import React from 'react';
import { useAuth0 } from '../../contexts/auth0-context';
import './Header.css'

export default function Header() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
      <nav className="navbar is-dark" id='nav'>
        <div className="container">
          <div className="navbar-menu is-active">
            {/* logo */}
            <div className="navbar-brand">
              <button className="navbar-item">Super Holiday Shopper</button>
            </div>

            {/* menu items */}
            <div className="navbar-end">
              {/* if there is no user. show the login button */}
              {!isLoading && !user && (
                <button onClick={loginWithRedirect} id= "loginButton" className="navbar-item">
                  Login
                </button>
              )}

              {/* if there is a user. show user name and logout button */}
              {!isLoading && user && (
                <>
                  {user.picture && <img src={user.picture} style={{ width: 40, height: 40, marginTop: 0 }} alt="My Avatar" />}
                  <button className="navbar-item">{user.name}</button>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="navbar-item"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
