'use strict';



module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        reply.statusCode = 301;
        reply.end();
    })
}
