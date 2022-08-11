import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import PostComments from './PostComments';
import SinglePost from './SinglePost';

// styles
import './Post.css';

export default function Post() {
  const { id } = useParams();
  const { error, document } = useDocument('trainingschedule', id);

  if (error) {
    return <div className='error'>{error}</div>;
  }
  if (!document) {
    return <div className='loading'>Loading...</div>;
  }
  return (
    <div className='post-details'>
      <SinglePost document={document} />
      <PostComments trainingschedule={document} />
    </div>
  );
}
