import { UserEntity } from '@db/user/user.entity';
import { Base } from 'src/utils/base.util';
import { VideoEntity } from '@db/video/video.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Comment')
export class CommentEntity extends Base {
  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'video_id' })
  videoId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, null, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;
}
