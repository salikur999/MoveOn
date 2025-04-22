const express = require('express')
const captainController = require('../controller/captain.controller')
const authMiddleware = require('../middlewares/auth.middlewares')
const router = express.Router();
const {body} = require('express-validator')

router.post('/register', [
    body('email').isEmail().withMessage('Ivalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be at least 3 character'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 character'),
    body('vehicle.plate').isLength({min:3}).withMessage('Pate must be at least 3 character'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
    
], captainController.registerCaptain )

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], captainController.loginCaptain);


router.get('/profile', authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)
module.exports = router;
