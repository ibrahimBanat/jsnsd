'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res, next) => {
    let params = req.query.un;
    if (!params) {
        var err = new Error('Bad Request');
        err.status = 400;
        res.send(err);
        return;
    }
    if (Array.isArray(params)) {
        let result = [];
        params.map(param => {
            result.push(convert(param));
        })

        setTimeout(() => {
            res.send(result);
        }, 1000)
        return;
    }
    setTimeout(() => {
        res.send(convert(params))
    }, 1000)
})
function convert (text) {
    return text.toUpperCase();
}
app.use(router)


app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})
