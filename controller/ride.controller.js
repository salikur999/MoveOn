const rideService = require('../services/ride.service')
const {validationResult} = require('express-validator')
const {sendMessageToSocketId} = require('../socket')

module.exports.crateRide = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId, pickup, destination, vehicleType} = req.body;

    try {
        
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        return res.status(201).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

module.exports.getFare = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {pickup, destination} = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports.confirmRide = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {rideId} = req.body;

    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId), {
            event: 'ride-confiremed',
            date: ride
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
           
}