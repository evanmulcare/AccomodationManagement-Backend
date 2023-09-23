const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    caravanid: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: { 
        type: Date,
        get: (date)=> date.toLocaleDateString() // set data format to DD/MM/YYYY
    }

}, {timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema)