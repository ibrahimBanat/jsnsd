"use strict";


module.exports = async (fastify, opts) => {
    fastify.get('/:id', (request, reply) => {
        const { id } = request.params;

    })
}
