import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@db/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const accessToken = await this.issueAccessToken(user.id);
    return {
      user: this.returnUserFields(user),
      accessToken,
    };
  }

  async register(dto: AuthDto) {
    const { email, password } = dto;
    const alreadyExists = await this.userRepository.findOneBy({
      email,
    });
    if (alreadyExists) throw new BadRequestException('Email already exists');
    const salt = await genSalt(10);
    const newUser = await this.userRepository.create({
      email,
      password: await hash(password, salt),
    });
    const user = await this.userRepository.save(newUser);
    const accessToken = await this.issueAccessToken(user.id);
    return {
      user: this.returnUserFields(user),
      accessToken,
    };
  }

  async validateUser(dto: AuthDto) {
    const { email } = dto;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password', 'flags'],
    });
    if (!user) throw new NotFoundException('User not found');
    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Incorrect password');
    return user;
  }

  async issueAccessToken(userId: string) {
    const data = {
      id: userId,
    };

    return await this.jwtService.signAsync(data, {
      expiresIn: '31d',
    });
  }

  returnUserFields(user: UserEntity) {
    const { id, email, flags } = user;
    return {
      id,
      email,
      flags,
    };
  }
}
