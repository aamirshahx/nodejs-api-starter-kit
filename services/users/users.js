import * as status from 'statuses';

export function userMiddleware(req, res, next) {
  console.group('Request is forward by user filter');
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
        content: 'User api Handled Successfully'
      }
    }
  };
}

export function getUser() {
  return {
    status: status['OK'],
    response: {
      resp: {
        status: 'success',
        content: [
          { id: '1', name: 'Aamir' },
          { id: '2', name: 'John' }
        ]
      }
    }
  };
}
