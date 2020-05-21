const express = require('express')
const fetch = require('node-fetch')

const yelpRouter = express.Router()

yelpRouter
    .route('/')
    .get((req, res) => {
        // let url = 'https://api.yelp.com/v3/businesses/search?'
        // let params = Object.keys(req.body).map(key => 
        //     `${key}=${req.body[key].toString().split(' ').join('+')}`);
        // url += params.join('&');
        // console.log(url)
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.YELP_API_KEY}`
            }
        }

        fetch(req.body.url, options)
            .then(response => response.json())
            .then(json => {
                res.json(json.businesses)
            })
    })



module.exports = yelpRouter