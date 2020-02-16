import http from 'http';
import debug from 'debug';
import { red } from 'chalk';
import app from './app';
import { Database } from './conn';

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string' ? 'Pipe ' : 'Port ') + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      return process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      return process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug('Listening on ' + bind);
};

const port = normalizePort(app.get('port'));

debug('core:server');

const server = http.createServer(app);
server.on('error', onError);
server.listen(port, onListening);

global.db = new Database();

function exitHandler(exitCode) {
  console.log(red(`Terminating Process ${exitCode}`));
  Database.close();
  server.close(err => console.log(red(err)));
  process.exit(exitCode);
}

process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null)); // catches ctrl+c event
process.on('SIGUSR1', exitHandler.bind(null)); // catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR2', exitHandler.bind(null)); // catches "kill pid" (for example: nodemon restart)
process.on('SIGTERM', exitHandler.bind(null));
// catches uncaught exceptions
process.on('uncaughtException', err => {
  console.log(red('Uncaught Exception'));
  console.log(err);
});
