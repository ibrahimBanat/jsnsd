const stream = require("../../stream");


module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        return stream();
    })
}
