import { useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function PostComments({ trainingschedule }) {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('trainingschedule');

  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    console.log(commentToAdd);

    await updateDocument(trainingschedule.id, {
      comments: [...trainingschedule.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className='post-comments'>
      <h4>Comments: </h4>
      <ul>
        {trainingschedule.comments.length > 0 &&
          trainingschedule.comments.map((comment) => (
            <li key={comment.id}>
              <div className='comment-author'>
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className='comment-date'>
                {/* using date-fns to set the latest post time, could have done a function for it */}
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className='comment-content'>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className='btn'>Add Comment</button>
      </form>
    </div>
  );
}
