import { BadRequestException, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { writeFile, ensureDir } from 'fs-extra';
import { VIDEOS_WRITE_FOLDER } from 'src/consts';
import fileExtensionRegex from 'src/utils/getFileExtension.util';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MediaService {
  async writer(
    mediaFile: Express.Multer.File,
    folder = 'default',
  ): Promise<string> {
    const uploadFolder = `${path}/uploads/${folder}`;
    const { originalname } = mediaFile;
    const writtenName = originalname.replace(/\./, `-${uuid()}.`);
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${writtenName}`, mediaFile.buffer);
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
