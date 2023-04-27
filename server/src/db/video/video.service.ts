import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ArrayContains,
  FindOptionsWhereProperty,
  ILike,
  MoreThan,
  Repository,
} from 'typeorm';
import { LikeEntity } from '../user/like.entity';
import { ViewEntity } from './view.entity';
import { VideoDto } from './video.dto';
import { VideoEntity } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(ViewEntity)
    private readonly viewRepository: Repository<ViewEntity>,
  ) {}

  async byId(id: string, isPublic = true) {
    const video = await this.videoRepository.findOne({
      where: {
        id,
        flags: isPublic ? ArrayContains(['isPublic']) : null,
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          username: true,
          avatarPath: true,
          flags: true,
          subscribersCount: true,
          subscriptions: true,
        },
        comments: {
          message: true,
          id: true,
          user: {
            id: true,
            username: true,
            avatarPath: true,
            flags: true,
            subscribersCount: true,
          },
        },
      },
    });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async update(id: string, dto: VideoDto) {
    const video = await this.byId(id);
    return this.videoRepository.save({
      ...video,
      ...dto,
    });
  }

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<VideoEntity> = {};
    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`),
      };
    }
    return this.videoRepository.find({
      where: {
        ...options,
        flags: ArrayContains(['isPublic']),
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          username: true,
          avatarPath: true,
          flags: true,
        },
      },
    });
  }

  async getMostViewed() {
    return this.videoRepository.find({
      where: {
        views: MoreThan(0),
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          username: true,
          avatarPath: true,
          flags: true,
        },
      },
      order: {
        viewsCount: -1,
      },
    });
  }

  async create(userId: string) {
    const defaultValues = {
      name: '',
      user: { id: userId },
      videoPath: '',
      description: '',
      thumbnailPath: '',
    };
    const newVideo = this.videoRepository.create(defaultValues);
    const video = await this.videoRepository.save(newVideo);
    return video.id;
  }

  async delete(id: string) {
    return this.videoRepository.delete({ id });
  }

  async updateViewCount(videoId: string, userIp: string) {
    const viewed = await this.viewRepository.findOne({
      where: {
        videoId,
        userIp,
      },
    });
    if (viewed) {
      return;
    }
    const video = await this.byId(videoId);
    video.viewsCount += 1;
    const view = this.viewRepository.create({
      userIp,
      videoId,
    });
    this.viewRepository.save(view);
    return this.videoRepository.save(video);
  }

  async updateLikes(videoId: string, userId: string) {
    const video = await this.byId(videoId);
    const like = await this.likeRepository.findOne({
      where: {
        userId,
        videoId,
      },
    });
    if (like) {
      video.likesCount = video.likesCount - 1;
      await this.likeRepository.delete({ id: like.id });
    } else {
      video.likesCount = video.likesCount + 1;
      const like = this.likeRepository.create({
        userId,
        videoId,
      });
      await this.likeRepository.save(like);
    }
    return this.videoRepository.save(video);
  }

  async checkLikes(videoId: string, userId: string) {
    const like = await this.likeRepository.findOne({
      where: {
        userId,
        videoId,
      },
    });
    if (like) {
      return true;
    }
    return false;
  }
}
