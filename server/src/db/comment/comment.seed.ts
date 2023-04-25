import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as seederIds from '@utils/seeder-data.util';
import randomElementFromArray from 'src/utils/randomElementFromArray.util';
import { DataSource } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { commentIds } from '@utils/seeder-data.util';
import { v4 as uuid } from 'uuid';

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
    for (let i = 0; i < 20; i += 1) {
      // for test case: loading multiple comments
      const comment = new CommentEntity();
      comment.message = faker.lorem.paragraph();
      comment.id = uuid();
      comment.videoId = 'f764008a-1548-4566-b58f-021fe980e2ef';
      comment.userId = randomElementFromArray(seederIds.regularUserSeederIds);
      comments.push(comment);
    }
    await dataSource.createEntityManager().save<CommentEntity>(comments);
  }
}
