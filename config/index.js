import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'ini';

const configPath = join(__dirname, 'config.ini');
const config = parse(readFileSync(configPath, { encoding: 'UTF-8' }));

config.database = {
  ...config.database,
  port: parseInt(config.database.port),
  retry: parseInt(config.database.retry),
  minPool: parseInt(config.database.minPool),
  maxPool: parseInt(config.database.maxPool),
  idleTimeout: parseInt(config.database.idleTimeout),
  idleCleanupTimeout: parseInt(config.database.idleCleanupTimeout),
  connectionTimeout: parseInt(config.database.connectionTimeout)
};

export default config;
