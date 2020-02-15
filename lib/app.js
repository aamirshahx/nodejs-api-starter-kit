import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from '../config';
import ApiHandler from '../routes';
import { development } from '../constants';

const app = express();
const { web, api } = config;

app.disable('x-powered-by');
app.set('port', process.env.PORT || '3000');
app.set('view engine', 'ejs');

const jsonOptions = { strict: true };
const urlencodedOptions = { extended: false };
const corsOptions = {
  origin: web.origin,
  optionsSuccessStatus: web.status
};

app.use(logger(api.logger));
app.use(express.json(jsonOptions));
app.use(express.urlencoded(urlencodedOptions));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/', ApiHandler);
app.all('*', (_, res) => res.sendStatus(404));

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = development ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
