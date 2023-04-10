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
        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const user = new UserEntity();
        user.id = uuid;
        user.name = name;
        user.password = 'password';
        user.email = `${name}@${faker.internet.domainName()}`
          .split(' ')
          .join(' ')
          .toLowerCase();
        user.description = '';
        return user;
      },
    );
    await dataSource.createEntityManager().save<UserEntity>(users);
  }
}
