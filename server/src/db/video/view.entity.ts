import { Base } from 'src/utils/base.util';
import { Column, Entity, ManyToOne } from 'typeorm';
import { VideoEntity } from './video.entity';

@Entity('View')
export class ViewEntity extends Base {
  @Column()
  userIp: string;

  @Column()
  videoId: string;

  @ManyToOne(() => VideoEntity, (video) => video.views)
  video: VideoEntity;
}
