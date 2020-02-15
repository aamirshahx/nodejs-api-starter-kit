import * as status from 'statuses';

export function loginMiddleware(req, res, next) {
  console.group('Auth request !!!');
  console.log(`Request served @ ${new Date()}\n`);
  console.groupEnd();
  next();
}

export function test() {
  return {
    status: status['OK'],
    response: {
      resp: {
        status: 'success',
        content: 'Login api Handled Successfully'
      }
    }
  };
}
