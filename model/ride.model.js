const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
        required: true
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted','ongoing', 'rejected', 'completed'],
        default: 'pending'
    },
    duration:{
        type: Number,
    },
    

    distance:{
        type: Number,
    },
    paymentId:{
        type: String,
    },
    orderId:{
        type: String,
    },
    signature:{
        type: String,
    },
    opt:{
        type: String,
        select: false,
        required: true
    }
})
const Ride = mongoose.model('ride', rideSchema)