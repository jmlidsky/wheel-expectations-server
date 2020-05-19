require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config');
const helmet = require('helmet')
// const fetch = require('node-fetch')
const { NODE_ENV } = require('./config')
const bikesRouter = require('./bikes/bikes-router')
const partsRouter = require('./parts/parts-router')
const yelpRouter = require('./yelp/yelp-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)

app.use('/api/bikes', bikesRouter)
app.use('/api/parts', partsRouter)
app.use('/yelp', yelpRouter)

app.get('/api/*', (req, res) => {
    res.send('Hello, world!')
})

// app.get('/yelp', (req, res) => {
//     const url = 'https://api.yelp.com/v3/businesses/search?term=bike+shop&radius=24140&location=22303'
//     const options = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.YELP_API_KEY}`
//         }
//     }

//     fetch(url, options)
//         .then(response => response.json())
//         .then(json => {
//             res.json(json.businesses)
//         })
// })

// function notFound(req, res, next) {
//     res.status(404)
//     const error = new Error('Not Found')
//     next(error)
// }

// function errorHandler(error, req, res, next) {
//     res.status(res.statusCode || 500)
//     res.json({
//         message: error.message
//     })
// }

// app.use(notFound)
// app.use(errorHandler)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app