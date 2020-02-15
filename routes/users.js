import express from 'express';
import { restrictedFilter } from '../middleware/api.filter';
import { userFilter, api } from '../services/users';

const router = express.Router();

router.use(restrictedFilter);
router.use(userFilter);

router.get('/', api.test);
router.get('/users', api.getUser);

export default router;
