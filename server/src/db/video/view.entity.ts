import { CommentEntity } from '@db/comment/comment.entity';
import { UserEntity } from '@db/user/user.entity';
import { Base } from 'src/utils/base.util';
import { Column, Entity } from 'typeorm';

@Entity('View')
export class ViewEntity extends Base {
  @Column()
  userIp: string;

  @Column()
  videoId: string;
}
