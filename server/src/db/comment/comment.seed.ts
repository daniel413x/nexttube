import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as seederIds from '@utils/seeder-data.util';
import randomElementFromArray from 'src/utils/randomElementFromArray.util';
import { DataSource } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { commentIds } from '@utils/seeder-data.util';

export default class CommentSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const comments = commentIds.map((id) => {
      const userId = randomElementFromArray(seederIds.regularUserSeederIds);
      const videoId = randomElementFromArray(seederIds.allVideoIds);
      const comment = new CommentEntity();
      comment.message = faker.lorem.paragraph();
      comment.id = id;
      comment.videoId = videoId;
      comment.userId = userId;
      return comment;
    });
    await dataSource.createEntityManager().save<CommentEntity>(comments);
  }
}
