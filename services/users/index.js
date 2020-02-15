import { test, getUser, userMiddleware } from './users';

export const userFilter = userMiddleware;

export const api = {
  test: (req, res) => {
    const { status, response } = test();
    res.status(status).json(response);
  },
  getUser: (req, res) => {
    const { status, response } = getUser();
    res.status(status).json(response);
  }
};
