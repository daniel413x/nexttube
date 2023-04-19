import { IsEmail, IsString } from 'class-validator';
import { IUserDto } from 'src/types';

export class UserDto implements IUserDto {
  @IsEmail()
  email: string;

  password?: string;

  @IsString()
  username: string;

  @IsString()
  description: string;

  @IsString()
  avatarPath: string;
}
