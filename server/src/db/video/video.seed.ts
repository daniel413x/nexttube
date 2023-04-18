import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as seederIds from '@utils/seeder-data.util';
import randomElementFromArray from 'src/utils/randomElementFromArray.util';
import randomMinMaxInt from 'src/utils/randomMinMaxInt.util';
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
    const programmingVideoTitles = [
      'React and Node.js: Building Scalable Web Applications',
      'Simplify Your Workflow with Bots and Scripts',
      'Pandas and NumPy for Powerful Data Manipulation',
      'Docker Best Practices: Optimizing Container Performance and Security for Production Environments',
    ];
    const catVideoTitles = [
      'Purrfect Compilation Of Kitty Bloopers',
      'Eastminster Cat Show Erupts In Controversy',
      '21 Cat-tastic Life Hacks Every Feline Owner Needs to Know',
      '12 Cat Breeds: Which Feline Friend is Right for You?',
    ];
    const smartphoneVideoTitles = [
      '15 Must-Have Smartphone Apps for 2023: Boost Your Productivity Today',
      "Smartphone Accessories You Didn't Know You Needed",
      '20 Tips and Tricks for Stunning Smartphone Photography',
      'The Future of Mobile Tech: 8 Upcoming Smartphone Trends to Watch Out For',
    ];
    const programmingVideos = seederIds.programmingVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.views = randomMinMaxInt(0, 1500);
      video.likes = 0;
      video.duration = 5;
      video.flags = ['isPublic'];
      video.videoPath = `/uploads/default/seeder-programming-${i + 1}.jpg`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-programming-${
        i + 1
      }.jpg`;
      video.id = uuid;
      video.name = `Programming Video ${i + 1}`;
      video.name = `${programmingVideoTitles[i]} (Programming Video ${i + 1})`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = programmingVideoUserId;
      return video;
    });
    const catVideos = seederIds.catVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.views = randomMinMaxInt(1000, 8000);
      video.likes = 0;
      video.duration = 5;
      video.flags = ['isPublic'];
      video.videoPath = `/uploads/default/seeder-cat-${i + 1}.jpg`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-cat-${i + 1}.jpg`;
      video.id = uuid;
      video.name = `${catVideoTitles[i]} (Cat Video ${i + 1})`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = catVideoUserId;
      return video;
    });
    const smartphoneVideos = seederIds.smartphoneVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.views = randomMinMaxInt(100, 5000);
      video.likes = 0;
      video.duration = 10;
      video.flags = [];
      video.videoPath = `/uploads/default/seeder-smartphone-${i + 1}.jpg`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-smartphone-${
        i + 1
      }.jpg`;
      video.id = uuid;
      video.name = `Smartphone Video ${i + 1}`;
      video.name = `${smartphoneVideoTitles[i]} (Smartphone Video ${i + 1})`;
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
