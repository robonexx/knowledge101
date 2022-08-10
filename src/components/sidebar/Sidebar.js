import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles & images
import './Sidebar.css';
import { AiFillPlusSquare } from 'react-icons/ai';

import { MdOutlineDashboard } from 'react-icons/md';
import Avatar from '../avatar/Avatar';

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <Avatar src={user.photoURL} />
          <p>Logged in as: <span>{user.displayName}</span></p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <MdOutlineDashboard className='icon' alt='dashboard icon' />
                <span>Schedule overviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='create'>
                <AiFillPlusSquare className='icon' alt='add project icon' />
                <span>Add new goals</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
