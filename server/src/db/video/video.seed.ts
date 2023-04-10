import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as seederIds from '@utils/seeder-data.util';
import randomElementFromArray from 'src/utils/randomElementFromArray.util';
import { DataSource } from 'typeorm';
import { VideoEntity } from './video.entity';

export default class VideoSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const programmingVideoUserId = randomElementFromArray(
      seederIds.uploaderUserSeederIds,
    );
    const catVideoUserId = randomElementFromArray(
      seederIds.uploaderUserSeederIds,
    );
    const smartphoneVideoUserId = randomElementFromArray(
      seederIds.uploaderUserSeederIds,
    );
    const programmingVideos = seederIds.programmingVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.likes = 0;
      video.duration = 0;
      video.flags = ['isPublic'];
      video.videoPath = `/uploads/default/seeder-programming-${i + 1}`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-programming-${i + 1}`;
      video.id = uuid;
      video.name = `Programming Video ${i + 1}`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = programmingVideoUserId;
      return video;
    });
    const catVideos = seederIds.catVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.likes = 0;
      video.duration = 0;
      video.flags = ['isPublic'];
      video.videoPath = `/uploads/default/seeder-cat-${i + 1}`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-cat-${i + 1}`;
      video.id = uuid;
      video.name = `Cat Video ${i + 1}`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = catVideoUserId;
      return video;
    });
    const smartphoneVideos = seederIds.smartphoneVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.likes = 0;
      video.duration = 0;
      video.flags = [];
      video.videoPath = `/uploads/default/seeder-smartphone-${i + 1}`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-smartphone-${i + 1}`;
      video.id = uuid;
      video.name = `Smartphone Video ${i + 1}`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = smartphoneVideoUserId;
      return video;
    });
    await dataSource
      .createEntityManager()
      .save<VideoEntity>([
        ...smartphoneVideos,
        ...programmingVideos,
        ...catVideos,
      ]);
  }
}
