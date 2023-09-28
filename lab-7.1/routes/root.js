'use strict'

const {
    BOAT_SERVICE_PORT,
    BRAND_SERVICE_PORT
} = process.env
const schema = {
    params: {
        type: 'object',
        additionalProperties: false,
        properties: {
            id: { type: 'integer' }
        }
    }
}
const boatUrl = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandUrl = `http://localhost:${BRAND_SERVICE_PORT}`;
module.exports = async function (fastify, opts) {
  fastify.get('/:id', {schema: schema}, async function (request, reply) {
    const {id} = request.params;
    const boatResponse = await fetch(boatUrl + '/' + id);
    if (boatResponse.status === 404) {
        console.log('not found')
        throw fastify.httpErrors.notFound()
    }
    const boatResult = await boatResponse.json();
    const brandResponse = await fetch(brandUrl + '/' + boatResult.brand);
    if (brandResponse.status === 404) {
        throw fastify.httpErrors.notFound();
    }
    const brandResult = await brandResponse.json();

    return {
        id: id,
        color: boatResult.color,
        brand: brandResult.name
    }
  })
}

