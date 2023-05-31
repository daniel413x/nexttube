import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { IComment } from '@types';
import useBreakpoints from '@hooks/useBreakpoints';
import useScrollDownLimit from '@hooks/useScrollDownLimit';
import useUser from '@hooks/useUser';
import useUtil from '@hooks/useUtil';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import styles from './Comments.module.scss';

interface CommentsProps {
  comments: IComment[];
  videoId: string;
  setShowRegisterModal: () => void;
}

const Comments: FC<CommentsProps> = ({
  comments,
  videoId,
  setShowRegisterModal,
}) => {
  const commentsUlRef = useRef(null);
  const scrolledToLimit = useScrollDownLimit(false, 500, commentsUlRef);
  const { xxl } = useBreakpoints();
  const user = useUser();
  const { videoHeight } = useUtil();
  const [height, setHeight] = useState(videoHeight || 0);
  useEffect(() => {
    if (!xxl) {
      setHeight(800);
      return;
    }
    if (videoHeight) {
      setHeight(videoHeight);
    }
  }, [videoHeight, xxl]);
  useEffect(() => {
    const video = document.getElementById('video');
    if (xxl && video) {
      setHeight(video.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={cn(styles.comments, {
        [styles.scrolled]: scrolledToLimit,
      })}
      style={
        xxl
          ? { height: `${height}px`, overflowY: 'hidden', minHeight: '300px' }
          : undefined
      }
    >
      <h2>Comments</h2>
      <div className={styles.line} />
      {comments.length ? (
        <ul
          ref={commentsUlRef}
          className={styles.commentsUl}
          style={{
            height: `calc(${xxl ? height : 600}px - 160px)`,
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
      {user && (
        <CommentForm
          videoId={videoId}
          setShowRegisterModal={setShowRegisterModal}
        />
      )}
    </div>
  );
};

export default Comments;
