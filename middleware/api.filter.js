export const restrictedFilter = (req, res, next) => {
  console.group('Request is forward by restricted filter');
  console.log(`Request served @ ${new Date()}\n`);
  console.groupEnd();
  next();
};
