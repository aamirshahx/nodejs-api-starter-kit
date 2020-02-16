import { Router } from 'express';
import AuthHandler from './auth';
import UsersHandler from './users';
import TasksHandler from './tasks';
import { invalidHandler, testHandler } from './common';

const router = Router();

router.use((req, res, next) => {
  res.type('application/json');
  next();
});

router.use('/auth', AuthHandler);
router.use('/users', UsersHandler);
router.use('/tasks', TasksHandler);

router.get('/test', testHandler);
router.all('*', invalidHandler);

export default router;
