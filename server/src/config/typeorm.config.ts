import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvConfig } from './db.config';
import { ConfigService } from '@nestjs/config';
import { entitiesPath } from 'src/utils/configPaths.util';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const baseConfig: TypeOrmModuleOptions = {
    entities: entitiesPath,
    logging: configService.get<string>('NODE_ENV') === 'development',
  };
  const envConfig = getEnvConfig();
  return {
    ...baseConfig,
    ...envConfig,
  } as TypeOrmModuleOptions;
};
