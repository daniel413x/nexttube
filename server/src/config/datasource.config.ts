import { join } from 'path';
import { entitiesPath } from 'src/utils/configPaths.util';
import { DataSource } from 'typeorm';
import { getEnvConfig } from './db.config';

export const dataSourceOptions = {
  ...(getEnvConfig() as any),
  entities: entitiesPath,
  defaultSeeder: [join(__dirname, '../db/seeders/root.seed.js')],
  migrations: [join(__dirname, '../../src/db/migrations/*.js')],
  seeders: [join(__dirname, '../db/**/*.seed.js')],
};

export const dataSource = async () => {
  const dataSourceConn = new DataSource(dataSourceOptions);
  await dataSourceConn.initialize();
  return dataSourceConn;
};

export default new DataSource(dataSourceOptions);
