import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { regularUserSeederIds, allVideoIds } from '@utils/seeder-data.util';
import randomElementFromArray from 'src/utils/randomElementFromArray.util';
import { LikeEntity } from './like.entity';

export default class LikeSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const likes = regularUserSeederIds.map((userId) => {
      const videoId = randomElementFromArray(allVideoIds);
      const like = new LikeEntity();
      like.videoId = videoId;
      like.userId = userId;
      return like;
    });
    await dataSource.createEntityManager().save<LikeEntity>(likes);
  }
}
