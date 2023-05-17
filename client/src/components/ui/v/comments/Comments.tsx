import { FC } from 'react';
import { IComment } from '@types';
import useUser from '@hooks/useUser';
import useUtil from '@hooks/useUtil';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import styles from './Comments.module.scss';

interface CommentsProps {
  comments: IComment[];
  videoId: string;
}

const Comments: FC<CommentsProps> = ({ comments, videoId }) => {
  const user = useUser();
  const { videoHeight } = useUtil();
  return (
    <div
      className={styles.comments}
      style={{ height: `${videoHeight}px`, overflowY: 'hidden' }}
    >
      <h2>Comments</h2>
      <div className={styles.line} />
      {comments.length ? (
        <ul
          className={styles.commentsUl}
          style={{
            height: `calc(${videoHeight}px - 160px)`,
            overflowY: 'scroll',
          }}
        >
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentItem comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Be the first to comment!</p>
      )}
      {user && <CommentForm videoId={videoId} />}
    </div>
  );
};

export default Comments;
