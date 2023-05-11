import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessingService {
  async resizeImage(
    imageBuffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(imageBuffer).resize(width, height).toBuffer();
  }
}
