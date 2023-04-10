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
import { VideoDto } from './video.dto';
import { VideoEntity } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
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
          name: true,
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
            name: true,
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
        name: ILike(`${searchTerm}`),
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
          name: true,
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
          name: true,
          avatarPath: true,
          flags: true,
        },
      },
      order: {
        views: -1,
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

  async updateViewCount(id: string) {
    const video = await this.byId(id);
    video.views += 1;
    return this.videoRepository.save(video);
  }

  async updateReaction(videoId: string, userId: string) {
    const video = await this.byId(videoId);
    const like = await this.likeRepository.findOne({
      where: {
        userId,
        videoId,
      },
    });
    if (like) {
      video.likes = video.likes - 1;
      await this.likeRepository.delete({ id: like.id });
    } else {
      video.likes = video.likes + 1;
      const like = this.likeRepository.create({
        userId,
        videoId,
      });
      await this.likeRepository.save(like);
    }
    return this.videoRepository.save(video);
  }
}
