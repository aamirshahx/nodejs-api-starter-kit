import * as status from 'statuses';

export const testHandler = (req, res) => {
  res.status(status['OK']).json({
    resp: {
      status: 'success',
      content: 'Api working'
    }
  });
};

export const invalidHandler = (req, res) => {
  res.status(status['Bad Request']).json({
    resp: {
      status: 'failure',
      content: `Invalid api endpoint ${req.url}`
    }
  });
};
