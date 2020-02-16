import Sequelize from 'sequelize';
import logger from 'morgan';
import config from '../config';
import { bgRed, green, yellow } from 'chalk';
import models from '../models';

export class Database {
  constructor() {
    Database.testConnection()
      .then(() => Database.registerModels())
      .then(() => Database.syncSchema(config.database.sync))
      .then(() => Database.healthCheck())
      .catch(err =>
        console.error('Unable to initialize to the database:', err)
      );
  }

  static get instance() {
    if (typeof Database._instance === 'undefined') {
      const { database } = config;

      Database._instance = new Sequelize({
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

    return Database._instance;
  }

  static registerModels() {
    return new Promise(resolve => {
      Object.values(models).forEach(model => model.init(Database.instance));

      Object.values(models)
        .filter(model => (typeof model.associate).includes('function'))
        .forEach(model => model.associate(Database.instance.models));

      resolve();
    });
  }

  static healthCheck() {
    Database.instance.models.Users.findOne({ username: 'test' })
      .then(() => console.log(green('Health check passed !!!')))
      .catch(err => console.error(err));

    console.log(
      green('Database connection has been established successfully.')
    );
  }

  static async testConnection() {
    try {
      console.log(green('Verifying db connection'));
      await Database.instance.authenticate();
      console.log(green('Connection verified successfully'));
    } catch (err) {
      console.log(bgRed('DB verification failed'));
      throw new Error(err);
    }
  }

  static async syncSchema(confirm = false) {
    return new Promise((resolve, reject) => {
      if (confirm) {
        try {
          console.log(green('Syncing db schema'));
          Database.instance.sync().then(() => {
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

  static close() {
    Database.instance.close();
  }
}
