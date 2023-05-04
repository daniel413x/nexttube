import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AVATARS_WRITE_FOLDER,
  THUMBNAILS_WRITE_FOLDER,
  VIDEOS_WRITE_FOLDER,
} from 'src/consts';
import { Auth } from '../auth/decorators/auth.decorator';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @HttpCode(200)
  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('media'))
  async uploadMediaFile(
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    if (folder === AVATARS_WRITE_FOLDER || folder === THUMBNAILS_WRITE_FOLDER) {
      return this.mediaService.saveImage(mediaFile, folder);
    }
    if (folder === VIDEOS_WRITE_FOLDER) {
      return this.mediaService.saveVideo(mediaFile);
    }
  }
}
