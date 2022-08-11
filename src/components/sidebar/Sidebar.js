import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles & images
import './Sidebar.css';
import { AiFillPlusSquare, AiOutlineDashboard } from 'react-icons/ai';
import { ImBooks } from 'react-icons/im'
import { SiMusicbrainz } from 'react-icons/si'
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
                <AiOutlineDashboard className='icon' alt='dashboard icon' />
                <span>Schedule overviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='create'>
                <AiFillPlusSquare className='icon' alt='add project icon' />
                <span>Add new goals</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='create'>
                <ImBooks className='icon' alt='add project icon' />
                <span>Knowledge</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='create'>
                <SiMusicbrainz className='icon' alt='add project icon' />
                <span>Music</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
