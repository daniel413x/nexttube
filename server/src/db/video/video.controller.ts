import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/db/auth/decorators/auth.decorator';
import { CurrentUser } from '@db/user/user.decorator';
import { VideoDto } from './video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/by-id/:id')
  async getPrivateVideo(@Param('id') id: string) {
    return this.videoService.byId(id);
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.videoService.getAll(searchTerm);
  }

  @Get('most-viewed')
  async getMostViewed() {
    return this.videoService.getMostViewed();
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async createVideo(@CurrentUser('id') id: string) {
    return this.videoService.create(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
    return this.videoService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteVideo(@Param('id') id: string) {
    return this.videoService.delete(id);
  }

  @HttpCode(200)
  @Put('update-views/:videoId')
  async updateViews(@Param('videoId') videoId: string) {
    return this.videoService.updateViewCount(videoId);
  }

  @HttpCode(200)
  @Put('update-reaction/:videoId')
  @Auth()
  async updateReaction(
    @Param('videoId') videoId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.videoService.updateReaction(videoId, userId);
  }
}
