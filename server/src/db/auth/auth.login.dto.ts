import { IsString } from 'class-validator';

export class LoginDto {
  usernameOrEmail: string;

  @IsString()
  password: string;
}
