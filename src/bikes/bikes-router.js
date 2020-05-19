const express = require('express')
const xss = require('xss')
const BikesService = require('./bikes-service')

const bikesRouter = express.Router()

const serializeBike = bike => ({
    id: bike.id,
    bike_name: xss(bike.bike_name),
    bike_description: xss(bike.bike_description),
    bike_category: bike.bike_category,
    bike_image: bike.bike_image,
})

bikesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BikesService.getAllBikes(knexInstance)
            .then(bikes => {
                res.json(bikes.map(serializeBike))
            })
            .catch(next)
    })

bikesRouter
    .route('/:bike_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        BikesService.getBikeById(
            knexInstance,
            req.params.bike_id
        )
            .then(bike => {
                if (!bike) {
                    return res.status(404).json({
                        error: { message: `Bike doesn't exist` }
                    })
                }
                res.bike = bike // save the bike for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeBike(res.bike))
    })

module.exports = bikesRouter