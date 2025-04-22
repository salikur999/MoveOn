const  rideModel = require('../model/ride.model')
const mapService = require('../services/maps.service')
const crypto = require('crypto')

  module.exports.createRide = async({})=>{ }

  async function getFare(pickup, distination)
  {

    if(!pickup || !distination)
    {
        throw new Error('Pickup and Destination are required')
    }
    const distanceTime = await mapService.getDistanceTime(pickup, distination);

     const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
     }
     const perkmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
     }
     const perMinuteRate = {
        auto:2,
        car: 3,
        motorcycle: 1.5
     }
     const fare = {
        auto: baseFare.auto + ((distanceTime.distance.value /1000)* perkmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto),
        car: baseFare.car + ((distanceTime.distance/1000) * perkmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + ((distanceTime.distance.value /1000) * perkmRate.motorcycle) + (distanceTime.duration * perMinuteRate.motorcycle)
     }
     return fare;
  } 
  module.exports.getFare = getFare;

  function getOtp(num){
   function generateOtp(num){
      const otp = crypto.randomInt(Math.pow(10, num -1), Math.pow(10, num)).toString();
      return otp;
   }
   return generateOtp(num)
}
  

  module.exports.createRide = async({
   user, pickup, destination, vehicleType
  })=>{
   if(!user || !pickup || !destination || !vehicleType)
   {
      throw new Error('All fields are required')
   }
   const fare = await getFare(pickup, destination);
   const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp: getOtp(6),
      fare: fare[vehicleType],
   })
   return ride;
  }
  
  module.exports.confirmRide = async({
   rideId, captain
  })=>{
   if(!rideId){
      throw new Error('Ride id is required')
   }

   await rideModel.findOneAndupdate({
      _id: rideId
   },
{
   status: 'accepted',
   captain: captain._id
})
const ride = await rideModel.findOne({
   _id: rideId
}).populate('user').populate('captain').select('+otp')

if(!ride){
   throw new Error('Ride not found');
}
return ride;const rideModel = require('../model/ride.model')
const mapService = require('../services/maps.service')
const crypto = require('crypto')

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required')
  }
  const fare = await getFare(pickup, destination)
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  })
  return ride
}

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and Destination are required')
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination)

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  }
  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  }
  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  }
  const fare = {
    auto: baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto),
    car: baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car),
    motorcycle: baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle),
  }
  return fare
}
module.exports.getFare = getFare

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString()
    return otp
  }
  return generateOtp(num)
}

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('Ride id is required')
  }

  await rideModel.findOneAndUpdate({
    _id: rideId,
  }, {
    status: 'accepted',
    captain: captain._id,
  })
  const ride = await rideModel.findOne({
    _id: rideId,
  }).populate('user').populate('captain').select('+otp')

  if (!ride) {
    throw new Error('Ride not found')
  }
  return ride
}
  }