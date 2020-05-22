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

module.exports = bikesRouter