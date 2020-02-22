const server = require('../.build/src/server');

after(async () => {
  await server.default.stop();
});
