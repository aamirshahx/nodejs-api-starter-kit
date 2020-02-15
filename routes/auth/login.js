import express from 'express';
import { loginFilter, api } from '../../services/auth';

const router = express.Router();

router.use(loginFilter);
router.get('/', api.test);

export default router;
