import express from 'express';
import { tasksFilter, api } from '../services/tasks';

const router = express.Router();

router
  .route('/')
  .all((req, res, next) => tasksFilter(req, res, next))
  .get(async (req, res) =>
    req.query.id ? await api.getTask(req, res) : await api.getAllTasks(req, res)
  )
  .post(async (req, res) => await api.saveTask(req, res))
  .put(async (req, res) => await api.updateTask(req, res))
  .delete(async (req, res) => await api.deleteTask(req, res));

export default router;
