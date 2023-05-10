import { Base } from 'src/utils/base.util';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Subscription')
export class SubscriptionEntity extends Base {
  @Column({ name: 'from_user_id' })
  fromUserId: string;

  @Column({ name: 'to_channel_id' })
  toChannelId: string;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'to_channel_id' })
  toChannel: UserEntity;
}
