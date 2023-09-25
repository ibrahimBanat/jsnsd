'use strict'
const { promisify } = require('util')
const { boat } = require('../../model')
const { uid } = boat
const read = promisify(boat.read)
const create = promisify(boat.create)
const del = promisify(boat.del)
const { BoatSchema } = require('../../schemas/Boat-schema');

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.post('/', {
      schema: BoatSchema
  } ,async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })
}


