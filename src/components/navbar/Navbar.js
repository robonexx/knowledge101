import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import Logo from '../logo/Logo';

// styles
import './Navbar.css';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className='navbar'>
      <div className="headline">
        <h2 className='page_title'>Knowledge Drop</h2>   
      <Logo />
      </div>
      <ul>
        {!user && (
          <>
            <li>
              <Link to='login' className='btn'>Login</Link>
            </li>
            <li>
              <Link to='signup' className='btn'>Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button className='btn' onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
