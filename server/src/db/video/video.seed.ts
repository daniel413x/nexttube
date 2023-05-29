import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as seederIds from '@utils/seeder-data.util';
import { PUBLIC } from 'src/consts';
import randomMinMaxInt from 'src/utils/randomMinMaxInt.util';
import { DataSource } from 'typeorm';
import { VideoEntity } from './video.entity';

export default class VideoSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const programmingVideoUserId = seederIds.uploaderUserSeederIds[0];
    const catVideoUserId = seederIds.uploaderUserSeederIds[1];
    const smartphoneVideoUserId = seederIds.uploaderUserSeederIds[2];
    const randomVideoUserId = seederIds.uploaderUserSeederIds[3];
    const programmingVideoTitles = [
      '🚀 React and Node.js: Building Scalable Web Applications',
      '💻🤖 Simplify Your Workflow with Bots and Scripts',
      '🐼🖩 Pandas and NumPy for Powerful Data Manipulation',
      'Docker Best Practices: Optimizing Container Performance and Security for Production Environments',
    ];
    const catVideoTitles = [
      '😻🤣  Purrfect Compilation Of Kitty Bloopers',
      '🙀 CONTROVERSY AT EASTMINSTER CAT SHOW',
      '21 Cat-tastic Life Hacks Every Feline Owner Needs to Know',
      '12 Cat Breeds: Which Feline Friend is Right for You?',
    ];
    const smartphoneVideoTitles = [
      '📱 15 MUST-HAVE SMARTPHONE APPS FOR 2023: Boost Your Productivity Today',
      "Smartphone Accessories You Didn't Know You Needed",
      '📱 20 Tips and Tricks for Stunning Smartphone Photography',
      'THE FUTURE OF MOBILE TECH: 8 Upcoming Smartphone Trends to Watch Out For',
    ];
    const randomVideoTitles = [
      'Trends In Freelance Work In 2023',
      'Must-Have Tech Accessories',
      "5 Secrets Social Media Doesn't Want You To Know...",
      'HOW TO GROW YOUR TikTok AUDIENCE',
    ];
    const programmingVideos = seederIds.programmingVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.viewsCount = randomMinMaxInt(0, 1500);
      video.likesCount = 0;
      video.duration = 5;
      video.flags = [PUBLIC];
      video.videoPath = `/uploads/default/seeder-programming.mp4`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-programming-${
        i + 1
      }.jpg`;
      video.id = uuid;
      video.name = `${programmingVideoTitles[i]} (Programming Video ${i + 1})`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = programmingVideoUserId;
      return video;
    });
    const catVideos = seederIds.catVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.viewsCount = randomMinMaxInt(1000, 8000);
      video.likesCount = 0;
      video.duration = 5;
      video.flags = [PUBLIC];
      video.videoPath = `/uploads/default/seeder-cat.mp4`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-cat-${i + 1}.jpg`;
      video.id = uuid;
      video.name = `${catVideoTitles[i]} (Cat Video ${i + 1})`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = catVideoUserId;
      return video;
    });
    const smartphoneVideos = seederIds.smartphoneVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.viewsCount = randomMinMaxInt(100, 5000);
      video.likesCount = 0;
      video.duration = 10;
      video.flags = [PUBLIC];
      video.videoPath = `/uploads/default/seeder-smartphone.mp4`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-smartphone-${
        i + 1
      }.jpg`;
      video.id = uuid;
      video.name = `${smartphoneVideoTitles[i]} (Smartphone Video ${i + 1})`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = smartphoneVideoUserId;
      return video;
    });
    const randomVideos = seederIds.randomVideoIds.map((uuid, i) => {
      const video = new VideoEntity();
      video.viewsCount = randomMinMaxInt(100, 5000);
      video.likesCount = 0;
      video.duration = 10;
      video.flags = [PUBLIC];
      video.videoPath = `/uploads/default/seeder-smartphone.mp4`;
      video.thumbnailPath = `/uploads/thumbnails/seeder-random-${i + 1}.jpg`;
      video.id = uuid;
      video.name = `${randomVideoTitles[i]} (Random Video ${i + 1})`;
      video.description = `${faker.lorem.paragraph()}`;
      video.userId = randomVideoUserId;
      return video;
    });
    await dataSource
      .createEntityManager()
      .save<VideoEntity>([
        ...smartphoneVideos,
        ...programmingVideos,
        ...catVideos,
        ...randomVideos,
      ]);
  }
}
