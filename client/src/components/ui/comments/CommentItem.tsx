import { FC } from 'react';
import { IComment } from '@types';
import ChannelInfoSmall from '../common/ChannelInfoSmall';
import styles from './CommentItem.module.scss';

interface CommentItemProps {
  comment: IComment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => (
  <div className={styles.commentItem}>
    <ChannelInfoSmall channel={comment.user} message={comment.message} />
  </div>
);

export default CommentItem;
