import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  username: string;

  @MinLength(6, {
    message: 'No less than 6 symbols',
  })
  @IsString()
  password: string;
}
