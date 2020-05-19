const express = require('express')
const fetch = require('node-fetch')

const yelpRouter = express.Router()

yelpRouter
    .route('/')
    .get((req, res) => {
        const url = 'https://api.yelp.com/v3/businesses/search?term=bike+shop&radius=24140&location=90210'
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.YELP_API_KEY}`
            }
        }

        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                res.json(json.businesses)
            })
    })

module.exports = yelpRouter