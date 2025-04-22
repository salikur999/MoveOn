const express = require('express')
const router = express.Router()
const authMiddlware = require('../middlewares/auth.middlewares')
const mapController = require('../controller/maps.controller')
const {query} = require('express-validator')

router.get('/get-coordinates', query('address').isString().isLength({min:3}),
authMiddlware.authUser, mapController.getCoordinates)

router.get('/get-distance-time', query('origin').isString().isLength({min:3}),
query('destination').isString().isLength({min:3}), authMiddlware.authUser, mapController.getDistanceTime)

router.get('/get-suggestions', 
    query('input').isString().isLength({min: 3}),
    authMiddlware.authUser,
    mapController.getSuggestions)

module.exports = router