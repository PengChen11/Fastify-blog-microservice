'use strict';

require('dotenv').config();

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});


// register a router
fastify.register(require('./src/route/router.js'));



module.exports =  {
  server: fastify,
  start: async () => {
    try {
      await fastify.listen(process.env.PORT || 3000);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  },
};


