import * as status from 'statuses';
import { Database } from '../../lib/conn';

export function userMiddleware(req, res, next) {
  console.group('Request is forward by user filter');
  console.log(`Request served @ ${new Date()}\n`);
  console.groupEnd();
  next();
}

export async function getUser(userId) {
  try {
    if (typeof userId === 'undefined' || userId === null) {
      throw new Error('Invalid parameters');
    }

    const user = await Database.getInstance().sequelize.models.User.findOne({
      where: { id: userId }
    });

    return {
      status: status['OK'],
      response: { status: 'success', user: user || {} }
    };
  } catch (e) {
    console.error(`Users :: Action -> getUser : Message -> ${e.message}`);
    console.log(e);
    return {
      status: status['Bad Request'],
      response: { status: 'failure', msg: e.message }
    };
  }
}

export async function addUser(params) {
  const sequelize = Database.getInstance().sequelize;

  try {
    const { name, password, email } = params;

    if (!name || !password || !email) {
      throw new Error('Invalid parameters');
    }

    return await sequelize.transaction(async transaction => {
      const user = await sequelize.models.User.create(
        {
          name,
          password,
          email
        },
        { transaction }
      );

      return {
        status: status['OK'],
        response: { status: 'success', user }
      };
    });
  } catch (e) {
    console.error(`Users :: Action -> createUser : Message -> ${e.message}`);
    console.log(e);
    return {
      status: status['Bad Request'],
      response: { status: 'failure', msg: e.message }
    };
  }
}

export async function deleteUser(userId) {
  const sequelize = Database.getInstance().sequelize;
  try {
    if (typeof userId === 'undefined' || userId === null) {
      throw new Error('Invalid parameters');
    }

    return await sequelize.transaction(async transaction => {
      const deletedUsers = await sequelize.models.User.destroy(
        { where: { id: userId } },
        { transaction }
      );
      return {
        status: status['OK'],
        response: {
          status: 'success',
          user: deletedUsers === 0 ? {} : { id: userId }
        }
      };
    });
  } catch (e) {
    console.error(`Users :: Action -> deleteUser : Message -> ${e.message}`);
    console.log(e);
    return {
      status: status['Bad Request'],
      response: { status: 'failure', msg: e.message }
    };
  }
}
