import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async byId(id: string) {
    // /user/profile
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        videos: true,
        subscriptions: {
          toChannel: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, dto: UserDto) {
    const { email, password, name, avatarPath, description } = dto;
    const user = await this.byId(id);
    const isSameUser = await this.userRepository.findOneBy({ email });
    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already exists');
    if (password) {
      const salt = await genSalt(10);
      user.password = await hash(password, salt);
    }
    user.email = email;
    user.description = description;
    user.avatarPath = avatarPath;
    user.name = name;
    return this.userRepository.save(user);
  }

  async subscribe(id: string, channelId: string) {
    const data = {
      toChannel: {
        id: channelId,
      },
      fromUser: {
        id,
      },
    };
    const isSubscribed = await this.subscriptionRepository.findOneBy(data);
    if (!isSubscribed) {
      const newSubscription = await this.subscriptionRepository.create(data);
      await this.subscriptionRepository.save(newSubscription);
      return true;
    }
    await this.subscriptionRepository.delete(data);
    return false;
  }
}
