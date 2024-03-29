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
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/db/auth/decorators/auth.decorator';
import { CurrentUser } from '@db/user/user.decorator';
import { VideoDto } from './video.dto';
import { VideoService } from './video.service';
import { Request } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/by-id/:id')
  async getPrivateVideo(@Param('id') id: string) {
    return this.videoService.byId(id);
  }

  @Get()
  async getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('createdAt') createdAt?: 'ASC' | 'DESC',
    @Query('min') min?: number,
    @Query('max') max?: number,
    @Query('views') views?: 'ASC' | 'DESC',
    @Query('likes') likes?: 'ASC' | 'DESC',
    @Query('duration') duration?: 'ASC' | 'DESC',
    @Query('range') range?: 'hour' | 'day' | 'week' | 'month' | 'year',
  ) {
    return this.videoService.getAll({
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
    });
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
  async updateViews(
    @Param('videoId') videoId: string,
    @Req() request: Request,
  ) {
    return this.videoService.updateViewCount(videoId, request.ip);
  }

  @HttpCode(200)
  @Put('update-likes/:videoId')
  @Auth()
  async updateLikes(
    @Param('videoId') videoId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.videoService.updateLikes(videoId, userId);
  }

  @HttpCode(200)
  @Get('check-likes/:videoId/:userId')
  async checkLikes(
    @Param('videoId') videoId: string,
    @Param('userId') userId: string,
  ) {
    return this.videoService.checkLikes(videoId, userId);
  }
}
