import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@db/user/user.entity';
import { ILike, Repository } from 'typeorm';
import { RegisterDto } from './auth.register.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from './auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const accessToken = await this.issueAccessToken(user.id);
    return {
      user: this.returnUserFields(user),
      accessToken,
    };
  }

  async register(dto: RegisterDto) {
    const { password, username } = dto;
    const usernameExists = await this.userRepository.findOneBy({
      username,
    });
    if (usernameExists)
      throw new BadRequestException('Username already exists');
    const salt = await genSalt(10);
    const newUser = await this.userRepository.create({
      username,
      password: await hash(password, salt),
    });
    const user = await this.userRepository.save(newUser);
    const accessToken = await this.issueAccessToken(user.id);
    return {
      user: this.returnUserFields(user),
      accessToken,
    };
  }

  async validateUser(dto: LoginDto) {
    const { usernameOrEmail } = dto;
    const user = await this.userRepository.findOne({
      where: [
        { username: ILike(`%${usernameOrEmail}%`) },
        { email: ILike(`%${usernameOrEmail}%`) },
      ],
      select: ['id', 'username', 'password', 'flags'],
    });
    if (!user)
      throw new HttpException(
        'User not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Incorrect password');
    return user;
  }

  async issueAccessToken(userId: string) {
    const data = {
      id: userId,
    };
    return await this.jwtService.signAsync(data, {
      expiresIn: '15s',
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
