'use strict'

const {
    BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050
} = process.env

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
    fastify.get('/:id', async function (request, reply) {
        const { id } = request.params;
        const noop = Function.prototype;
        const signal = AbortSignal.timeout(3000);

        const bicycleReq = await fetch(`${bicycleSrv}/${id}`, {signal});
        const brandReq = await fetch(`${brandSrv}/${id}`, {signal});

        const bicyclePromise = bicycleReq.json();
        const brandPromise = brandReq.json();
        bicyclePromise.catch(noop);
        brandPromise.catch(noop);
        const results = await Promise.allSettled([bicyclePromise, brandPromise]);

        for (const { reason } of results) if (reason) throw reason;
        const [bicycle, brand] = results.map(({ value }) => value);

        return {
            id: bicycle.id,
            color: bicycle.color,
            brand: brand.name,
        }
    })
}
