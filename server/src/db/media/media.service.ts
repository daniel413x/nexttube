import { BadRequestException, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { writeFile, ensureDir } from 'fs-extra';
import { THUMBNAILS_WRITE_FOLDER, VIDEOS_WRITE_FOLDER } from 'src/consts';
import { v4 as uuid } from 'uuid';
import { ImageProcessingService } from './image-processing.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  async writer(
    mediaFile: Express.Multer.File,
    folder = 'default',
  ): Promise<string> {
    const uploadFolder = `${path}/uploads/${folder}`;
    const { originalname } = mediaFile;
    const writtenName = originalname.replace(/\./, `-${uuid()}.`);
    const buffer =
      folder === THUMBNAILS_WRITE_FOLDER
        ? await this.imageProcessingService.resizeImage(
            mediaFile.buffer,
            640,
            360,
          )
        : mediaFile.buffer;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${writtenName}`, buffer);
    return writtenName;
  }

  async saveImage(mediaFile: Express.Multer.File, folder: string) {
    if (
      mediaFile.mimetype !== 'image/jpg' &&
      mediaFile.mimetype !== 'image/jpeg' &&
      mediaFile.mimetype !== 'image/png'
    ) {
      throw new BadRequestException('File must end in .jpg, .jpeg or .png');
    }
    const fileName = await this.writer(mediaFile, folder);
    return {
      url: `/uploads/${folder}/${fileName}`,
      name: fileName,
    };
  }

  async saveVideo(mediaFile: Express.Multer.File) {
    if (mediaFile.mimetype !== 'video/mp4') {
      throw new BadRequestException('File must end in .mp4');
    }
    const fileName = await this.writer(mediaFile, VIDEOS_WRITE_FOLDER);
    return {
      url: `/uploads/${VIDEOS_WRITE_FOLDER}/${fileName}`,
      name: fileName,
    };
  }
}
