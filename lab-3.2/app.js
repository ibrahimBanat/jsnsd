'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const repl = require("repl");

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.setNotFoundHandler((request, reply) => {
      if (request.method !== 'GET') {
          reply.status(405).send({'ok': false, 'error': 'Method Not Allowed'});
      }
      reply.status(404).send({'ok': false});
  })
}
