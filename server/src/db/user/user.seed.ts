import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import {
  regularUserSeederIds,
  uploaderUserSeederIds,
} from '@utils/seeder-data.util';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const users = [...regularUserSeederIds, ...uploaderUserSeederIds].map(
      (uuid) => {
        const handle = `${faker.name.jobType()}${faker.name.jobType()}`;
        const realName = `${faker.name.firstName()}${faker.name.lastName()}`;
        const user = new UserEntity();
        user.id = uuid;
        user.username = Math.random() > 0.5 ? handle : realName;
        Math.random() > 0.5
          ? (user.username = user.username.toLowerCase())
          : null;
        user.password = 'password';
        user.email = `${realName}@${faker.internet.domainName()}`.toLowerCase();
        user.description = '';
        return user;
      },
    );
    await dataSource.createEntityManager().save<UserEntity>(users);
  }
}
