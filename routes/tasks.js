import express from 'express';
import { tasksFilter, api } from '../services/tasks';

const router = express.Router();

router
  .route('/')
  .all((req, res) => tasksFilter(req, res))
  .get(async (req, res) => await api.getAllTasks(req, res))
  .post(async (req, res) => await api.saveTask(req, res));

router
  .route(':id')
  .all((req, res) => tasksFilter(req, res))
  .get(async (req, res) => await api.getTask(req, res))
  .put(async (req, res) => await api.updateTask(req, res))
  .delete(async (req, res) => await api.deleteTask(req, res));

export default router;
