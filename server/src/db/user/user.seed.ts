import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import {
  regularUserSeederIds,
  uploaderUserSeederIds,
} from '@utils/seeder-data.util';
import { genSalt, hash } from 'bcryptjs';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const users = await Promise.all(
      [...regularUserSeederIds, ...uploaderUserSeederIds].map(async (uuid) => {
        const handle = `${faker.name.jobType()}${faker.name.jobType()}`;
        const realName = `${faker.name.firstName()}${faker.name.lastName()}`;
        const user = new UserEntity();
        const salt = await genSalt(10);
        const password = await hash('password', salt);
        user.subscribersCount = Math.floor(Math.random() * 3000000);
        user.password = password;
        user.id = uuid;
        user.username = Math.random() > 0.5 ? handle : realName;
        Math.random() > 0.5
          ? (user.username = user.username.toLowerCase())
          : null;
        user.email = `${realName}@${faker.internet.domainName()}`.toLowerCase();
        user.description =
          uploaderUserSeederIds.indexOf(uuid) >= 0
            ? faker.lorem.paragraph()
            : '';
        return user;
      }),
    );
    await dataSource.createEntityManager().save<UserEntity>(users);
  }
}
