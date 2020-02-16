import express from 'express';
import { restrictedFilter } from '../middleware/api.filter';
import { userFilter, api } from '../services/users';

const router = express.Router();

router
  .use(restrictedFilter)
  .use(userFilter)
  .route('/')
  .get(async (req, res) => await api.getUser(req, res))
  .post(async (req, res) => await api.addUser(req, res))
  .delete(async (req, res) => await api.deleteUser(req, res));

export default router;
