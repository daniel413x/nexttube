import { Base } from 'src/utils/base.util';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { VideoEntity } from '../video/video.entity';
import { UserEntity } from './user.entity';

@Entity('Like')
export class LikeEntity extends Base {
  @Column({ name: 'from_user_id' })
  userId: string;

  @Column({ name: 'to_video_id' })
  videoId: string;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'from_user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'to_video_id' })
  video: UserEntity;
}
