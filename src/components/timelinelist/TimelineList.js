import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
// styles
import './TimelineList.css';

export default function TimelineList({ schedule }) {
  return (
    <div className='timeline-list'>
      {schedule.length === 0 && <p>Nothing here yet</p>}
      {schedule.map((t) => (
        <Link key={t.id} to={`/schemas/${t.id}`}>
          <div>
            {' '}
            <h4>{t.name}</h4>
            <Avatar src={t.createdBy.photoURL} />
          </div>

          <p>Date: {t.date.toDate().toDateString()} </p>
        </Link>
      ))}
    </div>
  );
}
