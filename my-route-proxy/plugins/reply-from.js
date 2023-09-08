"use strict";


const fp = require('fastify-plugin');
const replyFrom = require('@fastify/reply-from');


module.exports = fp(async function (fasitfy, opts) {
    fasitfy.register(replyFrom, {
        errorHandler: false
    })
})
