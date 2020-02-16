import { test, getUser, deleteUser, addUser, userMiddleware } from './users';

export const userFilter = userMiddleware;

export const api = {
  test: async (req, res) => {
    const { status, response } = test();
    res.status(status).json(response);
  },
  getUser: async (req, res) => {
    const { status, response } = await getUser(req.query.id);
    res.status(status).json(response);
  },
  addUser: async (req, res) => {
    const { status, response } = await addUser(req.body);
    res.status(status).json(response);
  },
  deleteUser: async (req, res) => {
    const { status, response } = await deleteUser(req.body.id);
    res.status(status).json(response);
  }
};
