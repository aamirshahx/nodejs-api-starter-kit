import { test, loginMiddleware } from './login';

export const loginFilter = loginMiddleware;

export const api = {
  test: (req, res) => {
    const { status, response } = test();
    res.status(status).json(response);
  }
};
