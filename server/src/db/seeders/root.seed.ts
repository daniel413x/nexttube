import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import CommentSeeder from '../comment/comment.seed';
import UserSeeder from '../user/user.seed';
import VideoSeeder from '../video/video.seed';

async function runSeeder(dataSource: DataSource, seederClass: any) {
  const seederInstance = new seederClass();
  await seederInstance.run(dataSource);
}

export default class RootSeeder extends Seeder {
  async run(dataSource: DataSource) {
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, VideoSeeder);
    await runSeeder(dataSource, CommentSeeder);
  }
}
