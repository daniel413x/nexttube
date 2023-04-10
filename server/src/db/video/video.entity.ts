import { CommentEntity } from '@db/comment/comment.entity';
import { UserEntity } from '@db/user/user.entity';
import { Base } from 'src/utils/base.util';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('Video')
export class VideoEntity extends Base {
  @Column({ default: '' })
  name: string;

  @Column({ type: 'text', array: true, default: () => "ARRAY['isPublic']" })
  flags: string[];

  @Column({ default: 0 })
  views?: number;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: 0 })
  duration?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'video_path' })
  videoPath: string;

  @Column({ default: '', name: 'thumbnail_path' })
  thumbnailPath: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.video)
  comments: CommentEntity[];
}
