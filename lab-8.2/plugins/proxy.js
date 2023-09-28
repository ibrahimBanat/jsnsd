"use strict";
const fp = require('fastify-plugin');
const proxy = require('@fastify/http-proxy');

module.exports = fp(async function (fastify, opts) {
    fastify.register(proxy, {
        upstream: "https://jsonplaceholder.typicode.com",
    })
})
