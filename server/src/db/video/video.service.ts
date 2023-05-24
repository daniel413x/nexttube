import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  ArrayContains,
  Between,
  FindOptionsOrderProperty,
  FindOptionsWhereProperty,
  ILike,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { dataSource } from 'src/config/datasource.config';
import { LikeEntity } from '../user/like.entity';
import { ViewEntity } from './view.entity';
import { VideoDto } from './video.dto';
import { VideoEntity } from './video.entity';
import { INCOMPLETE, PUBLIC } from 'src/consts';
import { subDays, subHours, subMonths, subWeeks, subYears } from 'date-fns';
import DataSource from 'src/config/datasource.config';

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
        flags: isPublic ? ArrayContains([PUBLIC]) : null,
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
    const video = await this.byId(id, false);
    return this.videoRepository.save({
      ...video,
      ...dto,
    });
  }

  async getAll({
    searchTerm,
    page,
    limit,
    createdAt,
    min,
    max,
    views,
    likes,
    duration,
    range,
  }) {
    const where: FindOptionsWhereProperty<VideoEntity> = {};
    if (searchTerm) {
      where.name = ILike(`%${searchTerm}%`);
    }
    if (min && max) {
      where.duration = Between(Number(min) * 60, Number(max) * 60);
    } else if (min) {
      where.duration = MoreThanOrEqual(Number(min) * 60);
    } else if (max) {
      where.duration = LessThanOrEqual(Number(max) * 60);
    }
    if (range) {
      const now = new Date();
      switch (range) {
        case 'hour':
          where.createdAt = MoreThan(subHours(now, 1));
          break;
        case 'day':
          where.createdAt = MoreThan(subDays(now, 1));
          break;
        case 'week':
          where.createdAt = MoreThan(subWeeks(now, 1));
          break;
        case 'month':
          where.createdAt = MoreThan(subMonths(now, 1));
          break;
        case 'year':
          where.createdAt = MoreThan(subYears(now, 1));
          break;
      }
    }
    const order: FindOptionsOrderProperty<VideoEntity> = {};
    if (createdAt) {
      order.createdAt = createdAt.toUpperCase(); // ASC or DESC
    }
    if (views) {
      order.viewsCount = views.toUpperCase();
    }
    if (likes) {
      order.likesCount = likes.toUpperCase();
    }
    if (duration) {
      order.duration = duration.toUpperCase();
    }
    const videos = await this.videoRepository.findAndCount({
      where: {
        ...where,
        flags: And(ArrayContains([PUBLIC]), Not(ArrayContains([INCOMPLETE]))),
      },
      order: {
        ...order,
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
      take: limit || undefined,
      skip: page * limit - limit || 0,
    });
    return videos;
  }

  async getMostViewed() {
    return this.videoRepository.find({
      where: {
        viewsCount: MoreThan(0),
        videoPath: Not(''),
        thumbnailPath: Not(''),
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
      flags: [],
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
    const manager = await dataSource();
    return await manager.transaction(async (transaction) => {
      const video = await transaction.findOne(VideoEntity, {
        where: {
          id: videoId,
        },
      });
      const like = await transaction.findOne(LikeEntity, {
        where: {
          userId,
          videoId,
        },
      });
      if (like) {
        video.likesCount = video.likesCount - 1;
        await transaction.remove(LikeEntity, like);
      } else {
        video.likesCount = video.likesCount + 1;
        const like = transaction.create(LikeEntity, {
          userId,
          videoId,
        });
        await transaction.save(LikeEntity, like);
      }
      return transaction.save(VideoEntity, video);
    });
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
