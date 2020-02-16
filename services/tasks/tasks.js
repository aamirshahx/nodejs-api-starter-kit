import * as status from 'statuses';
import { Database } from '../../lib/conn';

let cursor = 0;
export function tasksMiddleware(req, res, next) {
  console.group('Request is forward by tasks filter');
  console.log(`Request served @ ${new Date()}\n`);
  console.groupEnd();
  delete req.body.id;
  next();
}

export async function getAllTasks() {
  try {
    const tasks = await Database.getInstance().sequelize.models.Task.findAll();
    return {
      status: status['OK'],
      response: { status: 'success', tasks }
    };
  } catch (e) {
    return {
      status: status['Bad Request'],
      response: { status: 'failed', tasks: [] }
    };
  }
}

export async function getTask(taskId) {
  const sequelize = Database.getInstance().sequelize;

  try {
    const task = await sequelize.models.Task.findOne({
      where: { id: taskId }
    });

    return {
      status: status['OK'],
      response: { status: 'success', task }
    };
  } catch (e) {
    return {
      status: status['Bad Request'],
      response: { status: 'failed', task: {} }
    };
  }
}

export async function saveTask(params) {
  const sequelize = Database.getInstance().sequelize;

  try {
    const { title, done } = params;
    return await sequelize.transaction(async transaction => {
      let task = await sequelize.models.Task.create(
        {
          id: ++cursor,
          title,
          done
        },
        { transaction }
      );

      return {
        status: status['OK'],
        response: { status: 'success', task }
      };
    });
  } catch (e) {
    return {
      status: status['Bad Request'],
      response: { status: 'failed', task: {} }
    };
  }
}

export async function updateTask(params) {
  const sequelize = Database.getInstance().sequelize;
  try {
    const { id, title, done } = params;
    return await sequelize.transaction(async transaction => {
      let task = await sequelize.models.Task.findOrCreate(
        { id, title, done },
        { transaction }
      );

      return {
        status: status['OK'],
        response: { status: 'success', task }
      };
    });
  } catch (e) {
    return {
      status: status['Bad Request'],
      response: { status: 'failed', task: params }
    };
  }
}

export async function deleteTask(id) {
  const sequelize = Database.getInstance().sequelize;
  try {
    return await sequelize.transaction(async transaction => {
      await sequelize.models.Task.destroy({ where: { id } }, { transaction });

      return {
        status: status['OK'],
        response: { status: 'success', task: { id } }
      };
    });
  } catch (e) {
    return {
      status: status['Bad Request'],
      response: { status: 'failed', task: { id } }
    };
  }
}
