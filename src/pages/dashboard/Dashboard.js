import { useState } from 'react';
import TimelineList from '../../components/timelinelist/TimelineList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import TimelineFilter from './TimelineFilter';

// styles
import './Dashboard.css';
export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('trainingschedule');
  const [filter, setFilter] = useState('all');

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };
  const schedules = documents
    ? documents.filter((document) => {
        switch (filter) {
          case 'all':
            return true;
          case 'mine':
            let currentUser = false;
            if (user.uid === document.createdBy.id) {
              currentUser = true;
            }
            return currentUser;
          case 'foundations':
          case 'history':
          case 'groove':
          case 'steps':
          case 'technique':
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className='page-title'>Overview</h2>
      {error && <p className='error'>{error}</p>}

      {document && <TimelineFilter changeFilter={changeFilter} />}
      {documents && <TimelineList schedule={schedules} />}
    </div>
  );
}
