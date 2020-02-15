import express from 'express';
import { restrictedFilter } from '../../middleware/api.filter';
import LoginApi from './login';
import { testHandler } from '../common';

const router = express.Router();

router.use(restrictedFilter);
router.use('/login', LoginApi);
router.get('/', testHandler);
export default router;
