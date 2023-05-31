import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export function getEnvConfig() {
  const configService = new ConfigService();
  const nodeEnv = configService.get('NODE_ENV');
  const baseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
  };
  const dbConfig: TypeOrmModuleOptions =
    nodeEnv === 'development'
      ? {
          host: configService.get<string>('DEV_DB_HOSTNAME'),
          port: configService.get<number>('DEV_DB_PORT'),
          database: configService.get<string>('DEV_DB_NAME'),
          username: configService.get<string>('DEV_DB_USERNAME'),
          password: configService.get<string>('DEV_DB_PASSWORD'),
        }
      : nodeEnv === 'test'
      ? {
          host: configService.get<string>('TEST_DB_HOSTNAME'),
          port: configService.get<number>('TEST_DB_PORT'),
          database: configService.get<string>('TEST_DB_NAME'),
          username: configService.get<string>('TEST_DB_USERNAME'),
          password: configService.get<string>('TEST_DB_PASSWORD'),
        }
      : {
          host: configService.get<string>('PROD_DB_HOSTNAME'),
          port: configService.get<number>('PROD_DB_PORT'),
          database: configService.get<string>('PROD_DB_NAME'),
          username: configService.get<string>('PROD_DB_USERNAME'),
          password: configService.get<string>('PROD_DB_PASSWORD'),
          ssl: true,
        };
  return {
    ...baseConfig,
    ...dbConfig,
  };
}
