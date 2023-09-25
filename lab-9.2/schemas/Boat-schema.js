

const BoatDataSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['brand', 'color'],
    properties: {
        brand: { type: 'string', },
        color: { type: 'string' }
    }
}
const BoatBodySchema = {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
        data: BoatDataSchema
    }
}

const BoatSchema = {
    body: BoatBodySchema
}
module.exports = { BoatSchema }
