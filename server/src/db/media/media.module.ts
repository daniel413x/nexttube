import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { ImageProcessingService } from './image-processing.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, ImageProcessingService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
})
export class MediaModule {}
