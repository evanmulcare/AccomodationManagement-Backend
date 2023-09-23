const mongoose = require('mongoose')


const expenseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    vendor: {
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

module.exports = mongoose.model('Expense', expenseSchema)