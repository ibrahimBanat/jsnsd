"use strict";

const fastify = require("fastify");

module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        return reply.sendfile('hello.html');
    })
}
