import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from '@db/video/video.entity';
import { LikeEntity } from '../user/like.entity';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [TypeOrmModule.forFeature([VideoEntity, LikeEntity])],
})
export class VideoModule {}
