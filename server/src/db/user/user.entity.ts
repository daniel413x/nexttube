import { Base } from 'src/utils/base.util';
import { VideoEntity } from '@db/video/video.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { LikeEntity } from './like.entity';

@Entity('User')
export class UserEntity extends Base {
  @Column({ default: '', unique: true, nullable: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '', unique: true })
  username: string;

  @Column({ type: 'text', array: true, default: () => "ARRAY['registered']" })
  flags: string[];

  @Column({ default: 0, name: 'subscribers_count' })
  subscribersCount?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.toChannel)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => LikeEntity, (like) => like.userId)
  likes: LikeEntity[];
}
