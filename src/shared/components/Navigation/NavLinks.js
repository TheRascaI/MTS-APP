import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/`}>HOME</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.role === "OFFI" && (
        <li>
          <NavLink to={`/posts/new`}>NEW POST</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.role === "OFFI" && (
        <li>
          <NavLink to={`/posts/`}>ALL POSTS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/chars/user/${auth.userId}`}>MY CHARS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/chars/new`}>NEW CHAR</NavLink>
        </li>
      )}
          {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
