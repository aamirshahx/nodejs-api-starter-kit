import {
  getTask,
  getAllTasks,
  saveTask,
  updateTask,
  deleteTask,
  tasksMiddleware
} from './tasks';

export const tasksFilter = tasksMiddleware;

export const api = {
  getAllTasks: async (req, res) => {
    const { status, response } = await getAllTasks();
    res.status(status).json(response);
  },

  getTask: async (req, res) => {
    const { status, response } = await getTask(req.query.id);
    res.status(status).json(response);
  },

  saveTask: async (req, res) => {
    const { status, response } = await saveTask(req.body);
    res.status(status).json(response);
  },

  updateTask: async (req, res) => {
    const { status, response } = await updateTask(req.body);
    res.status(status).json(response);
  },

  deleteTask: async (req, res) => {
    const { status, response } = await deleteTask(req.body.id);
    res.status(status).json(response);
  }
};
