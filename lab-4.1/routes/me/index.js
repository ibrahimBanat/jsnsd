


module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply)=> {
        const name = 'ibrahim' || request.query.name
        return reply.view('me.hbs', {name})
    })
}
