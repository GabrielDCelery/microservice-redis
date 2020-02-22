const server = require('../.build/src/server');

before(async () => {
  await server.default.start();
});
