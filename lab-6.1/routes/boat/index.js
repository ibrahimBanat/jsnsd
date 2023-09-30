"use strict";

const { promisify } = require('util');
const { boat } = require('../../model');
const create = promisify(boat.create);
const read = promisify(boat.read);
const uid  = boat.uid;


const schema = {
    headers: {
        type: 'object',
        required: ['Content-Type'],
        properties: {
            'Content-Type' : {
                type: 'string',
                enum: ['application/json']
            }
        }
    },
    body: {
        type: 'object',
        required: ['data'],
        properties: {
            data: {
                type: 'object',
                required: ['brand', 'color'],
                additionalProperties: false,
                properties: {
                    brand: { type: 'string' },
                    color: { type: 'string' }
                }
            }
        }
    }
}

const getSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'integer'
            }
        }
    }
}

module.exports = async function (fastify, opts) {
    fastify.post('/', {schema: schema}, async function (request, reply) {
        const { data } = request.body;
        const id = uid();

        let created = await create(id , data);
        reply.code(201);
        return {
            id
        }
    });

    fastify.get('/:id', async function (request, reply) {
        const { id } = request.params;
        reply.header('Content-Type', 'application/json');
        let res = await read(id);
        reply.send(res);
    })
}

