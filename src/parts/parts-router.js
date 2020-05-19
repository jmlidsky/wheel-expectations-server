const express = require('express')
const xss = require('xss')
const PartsService = require('./parts-service')

const partsRouter = express.Router()

const serializePart = part => ({
    id: part.id,
    part_name: xss(part.part_name),
    part_description: xss(part.part_description),
    status: part.status,
})

partsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PartsService.getAllParts(knexInstance)
            .then(parts => {
                res.json(parts.map(serializePart))
            })
            .catch(next)
    })

module.exports = partsRouter