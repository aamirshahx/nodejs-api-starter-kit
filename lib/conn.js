import logger from 'morgan';
import { Sequelize } from 'sequelize';
import { green, bgRed, yellow } from 'chalk';
import config from '../config';

export class DbConn {
  constructor() {
    const { database } = config;

    this._sequelize = new Sequelize({
      host: database.host,
      port: database.port,
      dialect: database.dialect,
      database: database.database,
      username: database.username,
      password: database.password,
      retry: database.retry,
      pool: {
        min: database.minPool,
        max: database.maxPool,
        idle: database.idleTimeoutMillis,
        evict: database.idleCleanupTimeout,
        acquire: database.connectionTimeout
      },
      logging: logger
    });
  }

  static getInstance() {
    if (DbConn.instance !== null) {
      DbConn.instance = new DbConn();
    }
    return DbConn.instance;
  }

  async testConnection() {
    try {
      console.log(green('Verifying db connection'));
      await this._sequelize.authenticate();
      console.log(green('Connection verified successfully'));
    } catch (err) {
      console.log(bgRed('DB verification failed'));
      throw new Error(err);
    }
  }

  async syncSchema(confirm = false) {
    return new Promise((resolve, reject) => {
      if (confirm) {
        try {
          console.log(green('Syncing db schema'));
          this._sequelize.sync().then(() => {
            console.log(green('Sync completed'));
            resolve();
          });
        } catch (err) {
          console.log(bgRed('Sync failed'));
          reject(err);
        }
      } else {
        console.log(yellow('Schema Sync not triggered'));
        resolve();
      }
    });
  }

  get sequelize() {
    return this._sequelize;
  }

  close() {
    this._sequelize.close();
  }
}
