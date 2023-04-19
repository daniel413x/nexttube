import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/db/auth/decorators/auth.decorator';
import { CurrentUser } from './user.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.byId(id);
  }

  @Get('by-username/:username')
  async getUser(@Param('username') username: string) {
    return this.userService.byUsername(username);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async subscribeToChannel(
    @CurrentUser('id') id: string,
    @Param('channelId') channelId: string,
  ) {
    return this.userService.subscribe(id, channelId);
  }
}
