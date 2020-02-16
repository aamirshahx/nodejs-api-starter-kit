import { Sequelize } from 'sequelize';
import logger from 'morgan';
import { bgRed, green, yellow } from 'chalk';

import config from '../config';
import models from '../models';

export class Database {
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

  static async getInstance() {
    if (typeof Database._instance === 'undefined') {
      Database._instance = await new Database().init();
    }

    return Database._instance;
  }

  async init() {
    try {
      await this.testConnection();
      this.registerModels();
      await this.syncSchema(config.database.sync);
      await this.healthCheck();
    } catch (err) {
      console.error('Unable to initialize to the database:', err);
      throw new Error(err);
    }

    return this;
  }

  get sequelize() {
    return this._sequelize;
  }

  async testConnection() {
    try {
      console.log(green('Verifying db connection'));
      await this.sequelize.authenticate();
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
          this.sequelize.sync().then(() => {
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

  async healthCheck() {
    await this.sequelize.models.User.findOne({ where: { name: 'test' } })
      .then(() => console.log(green('Health check passed !!!')))
      .catch(err => console.error(err));

    console.log(
      green('Database connection has been established successfully.')
    );
  }

  registerModels() {
    Object.values(models)
      .map(model => model.init(this.sequelize))
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(this.sequelize.models));
  }

  close() {
    this.sequelize.close();
  }
}
