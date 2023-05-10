import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SubscriptionEntity } from './subscription.entity';
import { LikeEntity } from './like.entity';
import { VideoEntity } from '../video/video.entity';
import { ViewEntity } from '../video/view.entity';
import { CommentEntity } from '../comment/comment.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SubscriptionEntity,
      VideoEntity,
      LikeEntity,
      ViewEntity,
      CommentEntity,
    ]),
  ],
})
export class UserModule {}
