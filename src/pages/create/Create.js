import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import './Create.css';

/* 
Select library makes options and select box much easier to handle
just add the right properties and 
<option value label />
then ad it in the Select tag and do options and onChange
*/

const categories = [
  { value: 'foundations', label: 'Foundation' },
  { value: 'history', label: 'History' },
  { value: 'groove', label: 'Groove' },
  { value: 'steps', label: 'Steps' },
  { value: 'technique', label: 'Technique' },
];

export default function Create() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore('trainingschedule');
  
  const { user } = useAuthContext();

  // form fields
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState(null);
  /* 
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select training category');
      return;
    }

    // creating a createdby object from user
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // creating timeline document object
    const schedule = {
      name,
      details,
      category: category.value,
      date: timestamp.fromDate(new Date(date)),
      comments: [],
      createdBy,
    };

    await addDocument(schedule);

    if (!response.error) {
      navigate('/');
    }
  };

  return (
    <div className='assignment-form'>
      <h2 className='page-title'>Add new Schedule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Practice title:
          <input
            type='text'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          My practice description:
          <textarea
            type='text'
            value={details}
            required
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          Date added:
          <input
            type='date'
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Practice area:
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>

        <button className='btn assign-form-btn'>Add to schedule</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
}
